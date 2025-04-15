# import os
# from app.db.db import db

# from dotenv import load_dotenv

# load_dotenv()


# def execute_sql_file(file_path):
#     with open(file_path, "r") as file:
#         sql = file.read()

#     print("HI")
#     cursor = db.cursor()

#     try:
#         for statement in sql.split(";"):
#             if statement.strip():
#                 cursor.execute(statement)

#         db.commit()
#         print("SQL script executed successfully")
#     except Exception as e:
#         print("Error executing SQL script:", e)

#     finally:
#         cursor.close()
#         db.close()


# sql_file_path = os.getenv("user_sql_path")

# if sql_file_path:
#     execute_sql_file(sql_file_path)
# else:
#     print("SQL file path not found in the environment variables")


import os
from dotenv import load_dotenv
from app.db.db import (
    db,
)  # Assuming 'db' is your database connection object

load_dotenv()


def execute_sql_file(db_connection, file_path):
    """Executes the SQL statements in the given file using the provided database connection."""
    try:
        with open(file_path, "r") as file:
            sql = file.read()

        print(f"Executing SQL script: {os.path.basename(file_path)}")
        cursor = db_connection.cursor()

        for statement in sql.split(";"):
            if statement.strip():
                cursor.execute(statement)

        db_connection.commit()
        print(f"SQL script '{os.path.basename(file_path)}' executed successfully")

    except Exception as e:
        print(f"Error executing SQL script '{os.path.basename(file_path)}':", e)

    finally:
        if "cursor" in locals() and cursor:
            cursor.close()


def execute_all_sql_files(root_path):
    """Loops through the 'SQL' folder under the given path and executes all .sql files."""
    sql_folder_path = os.path.join(root_path)

    if not os.path.isdir(sql_folder_path):
        print(f"SQL folder not found at: {sql_folder_path}")
        return

    try:
        # Assuming 'db' is already initialized in 'app.db.db'
        if not db.is_connected():
            print("Database connection is not active.")
            return

        for filename in os.listdir(sql_folder_path):
            if filename.endswith(".sql"):
                file_path = os.path.join(sql_folder_path, filename)
                execute_sql_file(db, file_path)

    except Exception as e:
        print("An error occurred during SQL file execution:", e)

    finally:
        if db.is_connected():
            db.close()
            print("Database connection closed.")


sql_root_path = os.getenv("user_sql_path")

if sql_root_path:
    execute_all_sql_files(sql_root_path)
else:
    print(
        "Root path for SQL files not found in the environment variables ('user_sql_path')"
    )
