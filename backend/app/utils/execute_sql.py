import os
from app.db.db import db

from dotenv import load_dotenv

load_dotenv()


def execute_sql_file(file_path):
    with open(file_path, "r") as file:
        sql = file.read()

    print("HI")
    cursor = db.cursor()

    try:
        for statement in sql.split(";"):
            if statement.strip():
                cursor.execute(statement)

        db.commit()
        print("SQL script executed successfully")
    except Exception as e:
        print("Error executing SQL script:", e)

    finally:
        cursor.close()
        db.close()


sql_file_path = os.getenv("user_sql_path")

if sql_file_path:
    execute_sql_file(sql_file_path)
else:
    print("SQL file path not found in the environment variables")
