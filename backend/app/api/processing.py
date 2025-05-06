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


processing_router = APIRouter()

@processing_router.get("/processingPlant")
async def processingPlant():
	cursor = db.cursor(dictionary=True)
	try:
		cursor.execute(
			"""SELECT
					p.plantID,
					p.plantName,
					p.location,
					COUNT(pr.recordID) AS records,
					p.status
				FROM processingplant_t p
				JOIN processingrecord_t pr ON p.plantID = pr.plantID
				GROUP BY p.plantID;"""
		)
		result = cursor.fetchall()
	except mysql.connector.Error as err:
		cursor.close()
		raise HTTPException(status_code=500, detail=f"Database error: {err}")
	cursor.close()
	return result

@processing_router.get("/totalProcessingPlant")
async def get_total_processing_plant():
	cursor = db.cursor(dictionary=True)
	try:
		cursor.execute("SELECT COUNT(*) AS total_processing_plant FROM processingplant_t;")
		result = cursor.fetchall()  # Fetch all the results
	except mysql.connector.Error as err:
		cursor.close()
		raise HTTPException(status_code=500, detail=f"Database error: {err}")
	cursor.close()
	# Format the results into the desired JSON structure.
	formatted_result = {"total_processing_plant": result[0]["total_processing_plant"]}
	return formatted_result

@processing_router.get("/activeProcessingPlant")
async def get_active_processing_plant():
	cursor = db.cursor(dictionary=True)
	try:
		cursor.execute(
			"""SELECT COUNT(*) AS active_processing_plant
				FROM processingplant_t
				WHERE status = 'Currently Processing';"""
		)
		result = cursor.fetchall()  # Fetch all the results
	except mysql.connector.Error as err:
		cursor.close()
		raise HTTPException(status_code=500, detail=f"Database error: {err}")
	cursor.close()
	# Format the results into the desired JSON structure.
	formatted_result = {"active_processing_plant": result[0]["active_processing_plant"]}
	return formatted_result

@processing_router.get("/totalProcessingRecords")
async def get_total_processing_records():
	cursor = db.cursor(dictionary=True)
	try:
		cursor.execute("SELECT COUNT(*) AS total_processing_records FROM processingrecord_t;")
		result = cursor.fetchall()  # Fetch all the results
	except mysql.connector.Error as err:
		cursor.close()
		raise HTTPException(status_code=500, detail=f"Database error: {err}")
	cursor.close()
	# Format the results into the desired JSON structure.
	formatted_result = {"total_processing_records": result[0]["total_processing_records"]}
	return formatted_result

