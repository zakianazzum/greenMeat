# This file is used to connect to the database

# app/db/db.py

import mysql.connector  # Import the mysql.connector module to connect to MySQL databases.

# This module provides a Python interface to connect to MySQL databases and execute SQL queries.


def get_db_connection():  # Define a function to establish a connection to the MySQL database.
    # This function returns a database connection object.
    try:
        db = mysql.connector.connect(  ## Create a connection to the MySQL database.
            # The connection parameters are provided as arguments to the connect() method.
            host="localhost",
            user="root",
            password="",
            database="web_application",
        )
        return (
            db  # Return the database connection object if the connection is successful.
        )
    except (
        mysql.connector.Error
    ) as err:  # Handle any errors that occur during the connection attempt.
        # If an error occurs, print the error message and return None.
        print(f"Error: {err}")  # Print the error message.
        # This message will help in debugging the connection issue.
        return None


db = (
    get_db_connection()
)  # Call the get_db_connection() function to establish a connection to the database.
# The returned connection object is stored in the variable 'db'.
