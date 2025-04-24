import os
import mysql.connector
from dotenv import load_dotenv

load_dotenv()


def get_db_connection(
    init=False,
):
    try:
        if init:
            db = mysql.connector.connect(
                host="localhost",
                user="root",
                password="",
            )
        else:
            db = mysql.connector.connect(
                host="localhost",
                user="root",
                password="",
                database="greenmeat",
            )

        return db
    except (
        mysql.connector.Error
    ) as err:  # Handle any errors that occur during the connection attempt.
        # If an error occurs, print the error message and return None.
        print(f"Error: {err}")  # Print the error message.
        # This message will help in debugging the connection issue.
        return None


def execute_sql_file(db_connection, file_path):
    """Executes the SQL statements in the given file using the provided database connection."""
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            sql = file.read()

        print(f"🔧 Executing SQL script: {os.path.basename(file_path)}")
        cursor = db_connection.cursor()

        for statement in sql.split(";"):
            if statement.strip():
                cursor.execute(statement)

        db_connection.commit()
        print(f"✅ SQL script '{os.path.basename(file_path)}' executed successfully")

    except Exception as e:
        print(f"❌ Error executing SQL script '{os.path.basename(file_path)}':", e)

    finally:
        if "cursor" in locals() and cursor:
            cursor.close()


def execute_all_sql_files(root_path):
    """Loops through the 'SQL' folder under the given path and executes all .sql files."""
    sql_folder_path = os.path.join(root_path, "migrations")

    print(f"SQL folder path: {sql_folder_path}")
    db = get_db_connection(False)

    if not os.path.isdir(sql_folder_path):
        print(f"SQL folder not found at: {sql_folder_path}")
        return

    try:
        # Assuming 'db' is already initialized in 'app.db.db'
        if not db.is_connected():
            print("Database connection is not active.")
            return

        listedFiles = os.listdir(sql_folder_path)
        sortedFiles = sorted(listedFiles, key=lambda x: x.lower())

        for filename in sortedFiles:
            if filename.endswith(".sql"):
                file_path = os.path.join(sql_folder_path, filename)
                print(f"Found SQL file: {filename}")
                execute_sql_file(db, file_path)

    except Exception as e:
        print("An error occurred during SQL file execution:", e)

    finally:
        if db.is_connected():
            db.close()
            print("Database connection closed.")


sql_root_path = os.getenv("user_sql_pathW")

if sql_root_path:
    execute_all_sql_files(sql_root_path)
else:
    print("Root path for SQL files not found in the environment variables")
