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


warehouse_router = APIRouter()

@warehouse_router.get("/totalWareHouse")
async def totalWareHouse():
	cursor = db.cursor(dictionary=True)
	try:
		cursor.execute(
			"""SELECT COUNT(*) AS total_warehouse FROM warehouse_t;"""
		)
		result = cursor.fetchall()
	except mysql.connector.Error as err:
			cursor.close()
			raise HTTPException(status_code=500, detail=f"Database error: {err}")
	cursor.close()
		# Format the results into the desired JSON structure.
	formatted_result = {"total_warehouse": result[0]["total_warehouse"]}
	return formatted_result

@warehouse_router.get("/wareHouseInfo")
async def wareHouseInfo():
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute(
            """SELECT 
					w.storeID,
					w.location,
					w.capacity,
					COUNT(pr.batchID) AS batches
				FROM warehouse_t w
				JOIN packagedmeatbatch_t p ON w.storeID = p.storeID
				JOIN processingrecord_t pr ON p.recordID = pr.recordID
				GROUP BY w.storeID, w.location, w.capacity;"""
        )
        result = cursor.fetchall()
    except mysql.connector.Error as err:
        cursor.close()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    cursor.close()
    return result
