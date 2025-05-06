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


farms_router = APIRouter()

@farms_router.get("/totalFarms")
async def get_total_farms():
	cursor = db.cursor(dictionary=True)  # Use dictionary=True to get results as dictionaries
	try:
		cursor.execute("SELECT COUNT(*) AS total_farms FROM farms_t;")

		result = cursor.fetchall()  # Fetch all the results
	except mysql.connector.Error as err:
		cursor.close()
		raise HTTPException(status_code=500, detail=f"Database error: {err}")

	cursor.close()

	# Format the results into the desired JSON structure.
	formatted_result = {"total_farms": result[0]["total_farms"]}
	return formatted_result


@farms_router.get("/farmsByLocation")
async def get_farms_by_location():
    cursor = db.cursor(
        dictionary=True
    )  # Use dictionary=True to get results as dictionaries
    try:
        cursor.execute(
            """SELECT u.zone, COUNT(f.farmID) AS farm_count
				FROM user_t u
				JOIN farmer_t fm ON u.id = fm.farmerID
				JOIN farms_t f ON fm.farmerID = f.farmerID
				GROUP BY u.zone;"""
        )
        result = cursor.fetchall()  # Fetch all the results
    except mysql.connector.Error as err:
        cursor.close()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

    cursor.close()

    return result

@farms_router.get("/farmData")
async def get_farm_data():
	cursor = db.cursor(
		dictionary=True
	)
	try:
		cursor.execute("""
			SELECT
				f.farmID,
				fm.farmerID,
				u.name AS farmer_name,
				u.zone,
				COUNT(c.cattleID) AS items,
				f.isActive AS status
			FROM
				farms_t f
			LEFT JOIN 
				farmer_t fm ON f.farmerID = fm.farmerID
			LEFT JOIN 
				user_t u ON fm.farmerID = u.id
			LEFT JOIN
				cattle_t c ON f.farmID = c.farmID
			GROUP BY
				f.farmID, fm.farmerID, u.name, u.zone, f.isActive;""")
		
		result = cursor.fetchall()  # Fetch all the results
	except mysql.connector.Error as err:
		cursor.close()
		raise HTTPException(status_code=500, detail=f"Database error: {err}")
	cursor.close()
	return result