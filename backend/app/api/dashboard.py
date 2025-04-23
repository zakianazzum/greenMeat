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
        cursor.execute(
            "SELECT COUNT(*) AS total_meat_batch FROM MeatBatch;"
        )

        result = cursor.fetchall()  # Fetch all the results
    except mysql.connector.Error as err:
        cursor.close()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

    cursor.close()
    
	# Format the results into the desired JSON structure.
    formatted_result = {
		"total_meat_batch": result[0][0]
	}

    return formatted_result

@dashboard_router.get("/activeFarms")
async def get_active_farms():
    # if db is None:
	#     return {"error": "Database connection failed"}	
    
    cursor = db.cursor()
    try:
        cursor.execute(
            "SELECT COUNT(*) AS active_farms FROM Farms WHERE isActive = 1;"
        )
        result = cursor.fetchall()
    except mysql.connector.Error as err:
        cursor.close()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    cursor.close()
    formatted_result = {
        "active_farms": result[0][0]
    }

    return formatted_result


@dashboard_router.get("/pendingInspections")
async def get_pending_inspections():
    cursor = db.cursor()
    try:
        cursor.execute(
            "SELECT COUNT(*) AS  pending_inspections FROM InspectionReport WHERE status = 'Recheck';"

        )
        result = cursor.fetchall()
    except mysql.connector.Error as err:        
        cursor.close()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    cursor.close()
    formatted_result = {
        "pending_inspections": result[0][0]
    }
    return formatted_result

@dashboard_router.get("/activeShipment")
async def get_active_shipment():
    cursor = db.cursor()
    try:
        cursor.execute(
            "SELECT COUNT(*) AS active_shipment FROM ShipmentTracking WHERE status = 'In Transit';"
        )
        result = cursor.fetchall()
    except mysql.connector.Error as err:
        cursor.close()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    cursor.close()
    formatted_result = {
        "active_shipment": result[0][0]
    }
    return formatted_result