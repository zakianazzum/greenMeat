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
        cursor.execute("SELECT COUNT(*) AS total_meat_batch FROM meatbatch_t;")

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
        cursor.execute(
            "SELECT COUNT(*) AS active_farms FROM farms_t WHERE isActive = 1;"
        )
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
            "SELECT COUNT(*) AS  pending_inspections FROM inspectionreport_t WHERE status = 'Satisfactory';"
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
            "SELECT COUNT(*) AS active_shipment FROM shipmenttracking_t WHERE status = 'In Transit';"
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
                    meatbatch_t
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
					sl.zone,
					COUNT(gr.batchID) AS failed_batches,
					ROUND((COUNT(gr.batchID) / (SELECT COUNT(*) FROM inspectionreport_t WHERE status = 'Rejected')) * 100, 2) AS failure_percentage
				FROM inspectionreport_t ir
				JOIN gradingscorerecord_t gr ON ir.gRecordID = gr.gRecordID
				JOIN meatbatch_t mb ON gr.batchID = mb.batchID
				JOIN slaughterhouse_t sl ON mb.slaughterHouseId = sl.slaughterHouseId
				WHERE ir.status = 'Rejected'
				GROUP BY sl.zone
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
				FROM gradingcriteria_t;"""
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
            """ SELECT spt.trackingID, sd.temperature, spt.status
				FROM sensordata_t sd
				JOIN shipmenttracking_t spt ON sd.trackingID=spt.trackingID
				WHERE
					sd.temperature>4 OR spt.status = 'Delayed';"""
        )
        result = cursor.fetchall()
    except mysql.connector.Error as err:
        cursor.close()
        raise HTTPException(status_code=500, detail=f"Database error as {err}")
    return result


@dashboard_router.get("/qualityDistribution")
async def get_quality_distribution():
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute(
            """SELECT 
							mg.gradeName AS name,
							(COUNT(ir.reportID) / (SELECT COUNT(*) FROM inspectionreport_t) * 100) AS value
						FROM inspectionreport_t ir
						JOIN meatgrade_t mg ON ir.gradeID = mg.gradeID
						GROUP BY mg.gradeID;"""
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
					shipmenttracking_t
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


@dashboard_router.post("/criteriaInfo")
async def add_criteria(request: Request):
    cursor = db.cursor()
    try:
        data = await request.json()

        # Extract fields from request
        criteria_name = data.get("criteriaName")
        description = data.get("description")
        max_score = data.get("maxScore")

        # Validate required fields
        if not all([criteria_name, description, max_score]):
            raise HTTPException(status_code=400, detail="Missing required fields")

        # Insert new criteria
        query = """
            INSERT INTO gradingcriteria_t 
            (criteriaName, description, maxScore)
            VALUES (%s, %s, %s)
        """
        cursor.execute(query, (criteria_name, description, max_score))

        db.commit()
        new_criteria_id = cursor.lastrowid

        return {
            "message": "Grading criteria added successfully",
            "criteriaID": new_criteria_id,
        }

    except mysql.connector.Error as err:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    finally:
        cursor.close()


@dashboard_router.delete("/criteriaInfo/{criteria_id}")
async def delete_criteria(criteria_id: int):
    cursor = db.cursor()
    try:
        # Delete criteria
        query = "DELETE FROM gradingcriteria_t WHERE criteriaID = %s"
        cursor.execute(query, (criteria_id,))

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Grading criteria not found")

        db.commit()
        return {"message": "Grading criteria deleted successfully"}

    except mysql.connector.Error as err:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    finally:
        cursor.close()
