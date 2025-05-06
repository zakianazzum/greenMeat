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
        cursor.execute("SELECT COUNT(*) AS total_items FROM meatbatch_t;")

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
						  FROM meatbatch_t mb
					      JOIN meatcategory_t mc ON mb.categoryID = mc.categoryID
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
               FROM meatbatch_t mb
               JOIN meatcategory_t mc ON mb.categoryID = mc.categoryID
               JOIN slaughterhouse_t sh ON mb.slaughterHouseId = sh.slaughterHouseId
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

@items_router.get("/itemTypes")
async def get_item_types():
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute(
			"""SELECT mc.categoryName
			   FROM meatcategory_t mc"""
		)
        result = cursor.fetchall()
    except mysql.connector.Error as err:
        cursor.close()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    return result


@items_router.post("/addMeatBatch")
async def add_meat_batch(request: Request):
    cursor = db.cursor()
    try:
        data = await request.json()
        slaughterhouseID = data.get("slaughterhouseID")
        productionDate = data.get("productionDate")
        averageWeight = data.get("averageWeight")
        categoryID = data.get("categoryID")

        if not all([slaughterhouseID, productionDate, categoryID]):
            raise HTTPException(status_code=400, detail="Missing required fields")

        cursor.execute(
            """
            INSERT INTO meatbatch_t (slaughterhouseID, productionDate, averageWeight, categoryID)
            VALUES (%s, %s, %s, %s)
            """,
            (slaughterhouseID, productionDate, averageWeight, categoryID),
        )
        db.commit()

        return {"message": "Meat batch added successfully"}

    except mysql.connector.Error as err:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"MySQL Error: {err}")
    finally:
        cursor.close()


@items_router.get("/slaughterhouses")
def get_slaughterhouses():
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute("SELECT slaughterHouseId FROM slaughterhouse_t")
        result = cursor.fetchall()
        return result
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"MySQL Error: {err}")
    finally:
        cursor.close()


@items_router.get("/meatCategories")
def get_meat_categories():
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute("SELECT categoryID FROM meatcategory_t")
        result = cursor.fetchall()
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"MySQL Error: {err}")
    finally:
        cursor.close()
    return result
