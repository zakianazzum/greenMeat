# This file contains the API endpoints for user-related operations

# app/api/users.py

import datetime
from fastapi import (
    APIRouter,
    HTTPException,
    Request,
)
import mysql  # Import APIRouter for creating API endpoints and Request for handlling HTTP requests.
from app.db.db import (
    db,
)  # Import the database connection object 'db from the app/db/db.py' file.

user_router = (
    APIRouter()
)  # Create an instance of APIRouter to define user-related API endpoints.


@user_router.get("/users")  # Get all users from the database
def get_users():  # Get all users from the database
    # This function retrieves all users from the database and returns them in JSON format.
    if db is None:
        return {"error": "Database connection failed"}
    cursor = db.cursor()
    cursor.execute(
        "SELECT id, name, user_type, email, created_at, status FROM users"
    )  # Execute the SQL query to fetch all users from the database.
    result = cursor.fetchall()
    cursor.close()

    # Format the results into the desired JSON structure.
    formatted_users = []
    for row in result:
        formatted_user = {
            "id": row[0],
            "name": row[1],
            "email": row[3],
            "userType": row[2],
            "createdAt": (
                row[4].strftime("%Y-%m-%d")
                if isinstance(row[4], datetime.date)
                else str(row[4])
            ),  # Format the Date
            "status": row[5],
        }
        formatted_users.append(formatted_user)

    return {"users": formatted_users}


# The response will contain a list of all users in the database.


# Signup API
# @user_router.post("/signup")  # Adding user data to the database
# async def create_user(request: Request):
#     data = await request.json()
#     cursor = db.cursor()
#     cursor.execute(
#         f"INSERT INTO users (Name, Email, Password) VALUES ('{data['name']}', '{data['email']}', '{data['password']}')"
#     )

#     db.commit()

#     # return {"name": data["name"]}


@user_router.post("/signup")
async def create_user(request: Request):
    data = await request.json()
    try:
        cursor = db.cursor()
        sql = "INSERT INTO users (name, email, password, user_type) VALUES (%s, %s, %s, %s)"
        val = (
            data["name"],
            data["email"],
            data["password"],
            data["user_type"],
        )  # add user_type from the request body.
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
    db.cursor.execute(
        f"SELECT * FROM users WHERE Email = '{data['email']}' AND Password = '{data['password']}'"
    )

    result = db.cursor.fetchone()

    # if result:
    #     return {"message": "Login successful"}
    # else:
    #     return {"message": "Login failed"}
