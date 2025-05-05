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


items_router = APIRouter()


@items_router.get("/totalItems")
async def get_total_items():

    cursor = db.cursor()
    try:
        cursor.execute("SELECT COUNT(*) AS total_items FROM meatbatch;")

        result = cursor.fetchall()  # Fetch all the results
    except mysql.connector.Error as err:
        cursor.close()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

    cursor.close()

    # Format the results into the desired JSON structure.
    formatted_result = {"total_item": result[0][0]}

    return formatted_result


@items_router.get("/itemCounts")
async def get_item_counts():
    cursor = db.cursor()
    try:
        cursor.execute(
            """SELECT mc.categoryname, COUNT(mb.batchID) AS batch_count
						  FROM meatbatch mb
					      JOIN meatcategory mc ON mb.categoryID = mc.categoryID
						  GROUP BY mc.categoryname;"""
        )
        result = cursor.fetchall()  # Fetch all the results
    except mysql.connector.Error as err:
        cursor.close()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

    cursor.close()

    # Format the results into the desired JSON structure.
    formatted_result = [{"categoryName": row[0], "itemCount": row[1]} for row in result]

    # # return formatted_result
    return formatted_result


@items_router.get("/itemCatalog")
async def get_item_catalog():
    cursor = db.cursor()
    try:
        cursor.execute(
            """SELECT 
                mb.categoryID,
                mc.categoryName,
                sh.name,
                COUNT(mb.batchID) AS batchCount
               FROM meatbatch mb
               JOIN meatcategory mc ON mb.categoryID = mc.categoryID
               JOIN slaughterhouse sh ON mb.slaughterHouseId = sh.slaughterHouseId
               GROUP BY mb.categoryID, mc.categoryName, sh.name """
        )
        result = cursor.fetchall()
    except mysql.connector.Error as err:
        cursor.close()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

    cursor.close()
    formatted_result = [
        {
            "id": row[0],
            "itemType": row[1],
            "slaughterHname": row[2],
            "batchCount": row[3],
        }
        for row in result
    ]

    return formatted_result
