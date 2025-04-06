from fastapi import APIRouter, Request
from app.db.db import db

user_router = APIRouter()


# @user_router.get("/users")
# def get_users():
#     db.cursor.execute("SELECT * FROM users")
#     result = db.cursor.fetchall()

#     for i in result:
#         print(i)

#     # Return the result as a dictionary

#     return {"users": result}


# Signup API
@user_router.post("/signup")  # Adding user data to the database
async def create_user(request: Request):
    data = await request.json()
    cursor = db.cursor()
    cursor.execute(
        f"INSERT INTO users (Name, Email, Password) VALUES ('{data['name']}', '{data['email']}', '{data['password']}')"
    )

    db.commit()

    # return {"name": data["name"]}


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
