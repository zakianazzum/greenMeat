from jose import JWTError, jwt
from datetime import datetime, timedelta

import datetime
from fastapi import (
    Depends,
    Request,
    APIRouter,
    HTTPException,
)
import mysql
import mysql.connector  # Import APIRouter for creating API endpoints and Request for handlling HTTP requests.
from app.db.db import (
    get_db_connection,
)  # Import the database connection object 'db from the app/db/db.py' file.


SECRET_KEY = "your-secret"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

db = get_db_connection(False)


dashboard_router = APIRouter()


@dashboard_router.get("/meatbatch")
async def get_meatBatch_count():
    if db is None:
        return {"error": "Database connection failed"}

    cursor = db.cursor()
    try:
        cursor.execute("SELECT COUNT(*) AS total_meat_batch FROM meatbatch;")

        result = cursor.fetchall()  # Fetch all the results
    except mysql.connector.Error as err:
        cursor.close()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

    cursor.close()

    # Format the results into the desired JSON structure.
    formatted_result = {"total_meat_batch": result[0][0]}

    return formatted_result


@dashboard_router.get("/activeFarms")
async def get_active_farms():
    # if db is None:
    #     return {"error": "Database connection failed"}

    cursor = db.cursor()
    try:
        cursor.execute("SELECT COUNT(*) AS active_farms FROM farms WHERE isActive = 1;")
        result = cursor.fetchall()
    except mysql.connector.Error as err:
        cursor.close()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    cursor.close()
    formatted_result = {"active_farms": result[0][0]}

    return formatted_result


@dashboard_router.get("/pendingInspections")
async def get_pending_inspections():
    cursor = db.cursor()
    try:
        cursor.execute(
            "SELECT COUNT(*) AS  pending_inspections FROM inspectionreport WHERE status = 'Recheck';"
        )
        result = cursor.fetchall()
    except mysql.connector.Error as err:
        cursor.close()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    cursor.close()
    formatted_result = {"pending_inspections": result[0][0]}
    return formatted_result


@dashboard_router.get("/activeShipment")
async def get_active_shipment():
    cursor = db.cursor()
    try:
        cursor.execute(
            "SELECT COUNT(*) AS active_shipment FROM shipmenttracking WHERE status = 'In Transit';"
        )
        result = cursor.fetchall()
    except mysql.connector.Error as err:
        cursor.close()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    cursor.close()
    formatted_result = {"active_shipment": result[0][0]}
    return formatted_result


@dashboard_router.get("/batchCounts/monthly")
async def get_monthly_batch_counts():
    cursor = db.cursor()
    try:
        cursor.execute(
            """SELECT
               		MONTHNAME(productionDate) AS month,
                    COUNT(batchID) AS batch_count
                FROM
                    meatbatch
                WHERE
                    YEAR(productionDate) = 2024
                GROUP BY
                    MONTH(productionDate)
                ORDER BY
                    MONTH(productionDate);"""
            # The SQL query selects the month name and the count of batch IDs from the meatbatch table for the year 2024, groups by month, and orders by month.
        )
        result = cursor.fetchall()
    except mysql.connector.Error as err:
        cursor.close()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    cursor.close()

    # Format the results into the desired JSON structure.
    formatted_result = [{"month": row[0], "batch_count": row[1]} for row in result]

    return formatted_result


@dashboard_router.get("/analytics")
async def get_analytics():
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute(
            """SELECT 
					fa.farmRegion,
					COUNT(ir.batchID) AS failed_batches,
					ROUND((COUNT(ir.batchID) / (SELECT COUNT(*) FROM inspectionreport WHERE status = 'Fail')) * 100, 2) AS failure_percentage
				FROM inspectionreport ir
				JOIN meatbatch mb ON ir.batchID = mb.batchID
				JOIN slhrecord slh ON mb.slaughterHouseId = slh.slhRecordID
				JOIN cattle c ON slh.cattleID = c.cattleID
				JOIN farms f ON  c.farmID = f.farmID
				JOIN farmer fa ON  f.farmerID = fa.farmerID
				WHERE ir.status = 'Fail'
				GROUP BY fa.farmRegion
				ORDER BY failure_percentage DESC; """
        )
        result = cursor.fetchall()
    except mysql.connector.Error as err:
        cursor.close()
        raise HTTPException(status_code=500, detail=f"Database error as {err}")
    return result


@dashboard_router.get("/criteriaInfo")
async def get_criteria_info():
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute(
            """ SELECT 
					criteriaName,
					description,
					maxScore
				FROM gradingcriteria
				LIMIT 4;"""
        )
        result = cursor.fetchall()
    except mysql.connector.Error as err:
        cursor.close()
        raise HTTPException(status_code=500, detail=f"Database error as {err}")
    return result


@dashboard_router.get("/alertInfo")
async def get_alert_info():
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute(
            """SELECT trackingID, temperature, status
               FROM shipmenttracking 
               WHERE temperature > 4.0 OR status = 'Delayed';"""
        )
        result = cursor.fetchall()
    except mysql.connector.Error as err:
        cursor.close()
        raise HTTPException(status_code=500, detail=f"Database error as {err}")
    return result 

@dashboard_router.get("/deliveredVsPending")
async def get_delivered_vs_pending():
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute(
            """SELECT
					DATE_FORMAT(arrivalDate, '%M') AS month,
					SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END) AS delivered,
					SUM(CASE WHEN status = 'delayed' THEN 1 ELSE 0 END) AS `delayed`
				FROM
					shipmenttracking
				WHERE
					arrivalDate IS NOT NULL
					AND YEAR(arrivalDate) = 2025
				GROUP BY
					MONTH(arrivalDate)
				ORDER BY
					MONTH(arrivalDate);"""
        )
        result = cursor.fetchall()
    except mysql.connector.Error as err:
        cursor.close()
        raise HTTPException(status_code=500, detail=f"Database error as {err}")
    return result
