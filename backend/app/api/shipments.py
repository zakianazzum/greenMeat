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


shipment_router = APIRouter()


@shipment_router.get("/trackingInfo")
async def get_tracking_info():
    cursor = db.cursor()

    try:
        cursor.execute(
            """SELECT 
    				st.transportationID,
    				st.trackingID,
    				st.packageID,
    				st.retailerID,
    				st.depertureDate,
    				st.arrivalDate,
    				st.status,
    				sd.temperature,
    				st.longitude,
    				st.latitude,
    				w.location AS origin,
    				u.zone AS destination
				FROM shipmenttracking_t st
                JOIN sensordata_t sd ON st.trackingID = sd.trackingID
				JOIN packagedmeatbatch_t pmb ON st.packageID = pmb.packageID
				JOIN warehouse_t w ON pmb.storeID = w.storeID
				JOIN user_t u ON st.retailerID = u.id
				WHERE YEAR(st.depertureDate) IN (2024, 2025)
				ORDER BY YEAR(st.depertureDate) DESC, st.depertureDate DESC;"""
        )
        result = cursor.fetchall()
    except mysql.connector.Error as err:
        cursor.close()
        raise HTTPException(status_code=500, detail=f"Database error {err}")

    formatted_result = [
        {
            "id": row[0],
            "trackingId": row[1],
            "batchId": row[2],
            "retailerId": row[3],
            "departureTime": row[4],
            "estimatedArrival": row[5],
            "status": row[6],
            "temperature": row[7],
            "longitude": row[8],
            "latitude": row[9],
            "origin": row[10],
            "destination": row[11],
        }
        for row in result
    ]
    return formatted_result


@shipment_router.get("/shipmentByLocation")
async def get_shipment_by_location():
    cursor = db.cursor()
    try:
        cursor.execute(
            """ SELECT 
					u.zone AS destination,
					COUNT(*) AS shipment_count,
					ROUND((COUNT(*) / total.total_shipments) * 100, 2) AS shipment_percentage
				FROM shipmenttracking_t st
				JOIN packagedmeatbatch_t pmb ON st.packageID = pmb.packageID
				JOIN warehouse_t w ON pmb.storeID = w.storeID
				JOIN user_t u ON st.retailerID = u.id
				JOIN (
					SELECT COUNT(*) AS total_shipments
					FROM shipmenttracking_t
					WHERE YEAR(depertureDate) IN (2024, 2025)
				) AS total
				WHERE YEAR(st.depertureDate) IN (2024, 2025)
				GROUP BY u.zone
				ORDER BY shipment_percentage DESC;"""
        )
        result = cursor.fetchall()
    except mysql.connector.Error as err:
        cursor.close()
        raise HTTPException(status_code=500, detail=f"Database error {err}")
    formatted_result = [{row[0]: row[2]} for row in result]
    return formatted_result


@shipment_router.get("/shipmentInfo")
async def get_shipment_info():
    cursor = db.cursor()
    try:
        cursor.execute(
            """SELECT 
					COUNT(trackingID)AS 'Total Shipment',
					COUNT(CASE WHEN status = 'In Transit' THEN 1 END) AS 'In Transit',
					COUNT(CASE WHEN status = 'Delivered' THEN 1 END) AS 'Delivered',
					COUNT(CASE WHEN status = 'Delayed' THEN 1 END) AS 'Delayed'    
				FROM shipmenttracking_t; """
        )
        result = cursor.fetchall()
    except mysql.connector.Error as err:
        cursor.close()
        raise HTTPException(status_code=500, detail=f"Database error {err}")

    formatted_result = {
        "total_shipment": result[0][0],
        "in_transit": result[0][1],
        "delivered": result[0][2],
        "delayed": result[0][3],
    }

    return formatted_result
