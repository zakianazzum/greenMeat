# This file is used to connect to the database

# app/db/db.py

import mysql.connector  # Import the mysql.connector module to connect to MySQL databases.

# This module provides a Python interface to connect to MySQL databases and execute SQL queries.


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
                database="GreenMeat",
            )

        return db
    except (
        mysql.connector.Error
    ) as err:  # Handle any errors that occur during the connection attempt.
        # If an error occurs, print the error message and return None.
        print(f"Error: {err}")  # Print the error message.
        # This message will help in debugging the connection issue.
        return None
