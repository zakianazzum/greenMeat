# This file contains the API endpoints for user-related operations

# app/api/users.py

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

db = get_db_connection(False)  # Get the database connection object.


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


user_router = (
    APIRouter()
)  # Create an instance of APIRouter to define user-related API endpoints.


@user_router.get("/users")
async def get_users():  # Get all users from the database
    # This function retrieves all users from the database and returns them in JSON format.

    if db is None:
        return {"error": "Database connection failed"}
    cursor = db.cursor()
    try:
        cursor.execute(
            "SELECT id, name, user_type, email, created_at, status FROM user_t;"
        )
        result = cursor.fetchall()
    except mysql.connector.Error as err:
        cursor.close()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

    # Format the results into the desired JSON structure.
    formatted_users = []

    for row in result:
        formatted_user = {
            "id": row[0],
            "name": row[1],
            "email": row[3],
            "status": row[5],
            "userType": row[2],
            "createdAt": (
                row[4].strftime("%Y-%m-%d")
                if isinstance(row[4], datetime.date)
                else str(row[4])
            ),  # Format the Date
        }

        formatted_users.append(formatted_user)

    return {"users": formatted_users}


# The response will contain a list of all users in the database.


@user_router.post("/signup")
async def create_user(request: Request):
    data = await request.json()

    print(data)
    try:
        cursor = db.cursor()
        sql = "INSERT IGNORE INTO user_t (name, user_type, password, email, zone) VALUES (%s, %s, %s, %s, %s)"
        val = (
            data["name"],
            data["user_type"],
            data["password"],
            data["email"],
            data["zone"],
        )

        cursor.execute(sql, val)
        db.commit()
        cursor.close()

        return {"message": "User created successfully"}

    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

    except KeyError as err:
        raise HTTPException(status_code=400, detail=f"Missing key: {err}")


@user_router.post("/login")
async def login(request: Request):
    data = await request.json()

    try:
        cursor = db.cursor()
        cursor.execute(
            "SELECT id, name, email, user_type FROM user_t WHERE email = %s AND password = %s",
            (data["email"], data["password"]),
        )
        result = cursor.fetchone()
        cursor.close()

        if result:
            # Prepare token data
            token_data = {
                "sub": result[2],  # email
                "user_id": result[0],
                "user_type": result[3],
            }

            access_token = create_access_token(token_data)

            return {
                "user": {
                    "id": result[0],
                    "name": result[1],
                    "email": result[2],
                    "user_type": result[3],
                },
                "access_token": access_token,
            }
        else:
            raise HTTPException(status_code=401, detail="Invalid credentials")

    except KeyError as err:
        raise HTTPException(status_code=400, detail=f"Missing key: {err}")

    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")


@user_router.get("/userCountByType")
async def get_user_counts_by_type():
    if db is None:
        return {"error": "Database connection failed"}

    cursor = db.cursor()
    try:
        cursor.execute(
            "SELECT user_type, COUNT(*) AS count FROM user_t WHERE user_type != 'admin' GROUP BY user_type;"
        )

        result = cursor.fetchall()  # Fetch all the results
    except mysql.connector.Error as err:
        cursor.close()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

    cursor.close()

    # Format the results into the desired JSON structure.
    formatted_counts = []
    rowCount = 0

    for row in result:
        formatted_count = {
            "userType": row[0],  # user_type (the type of user)
            "count": row[1],  # The count of users for that type
        }
        rowCount += row[1]
        formatted_counts.append(formatted_count)

    return {
        "userCounts": formatted_counts,
        "totalCount": rowCount,  # The total count of users
    }  # Return the formatted counts in JSON format.
