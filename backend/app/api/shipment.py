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
            """SELECT transportationID,trackingID,packageID, retailerID,depertureDate,
			   arrivalDate,status, temperature, longitude, latitude
			   FROM shipmenttracking
			   WHERE YEAR(depertureDate) IN (2024, 2025) 
			   ORDER BY YEAR(depertureDate) DESC, depertureDate DESC;"""
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
        }
        for row in result
    ]
    return formatted_result
