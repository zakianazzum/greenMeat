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


inspection_router = APIRouter()


@inspection_router.get("/inspectionReport")
async def get_inspection_report():

    cursor = db.cursor()
    try:
        cursor.execute(
            """SELECT reportID,batchID, inspectionID, inspectionDate, gradingScore, status, remarks
			FROM inspectionreport
			WHERE YEAR(inspectionDate) IN (2024, 2025)
			ORDER BY YEAR(inspectionDate) DESC, inspectionDate DESC; """
        )
        result = cursor.fetchall()
    except mysql.connector.error as err:
        cursor.close()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

    formatted_result = [
        {
            "id": row[0],
            "batchId": row[1],
            "inspectorId": row[2],
            "date": row[3],
            "score": row[4],
            "status": row[5],
            "remarks": row[6],
        }
        for row in result
    ]
    return formatted_result
