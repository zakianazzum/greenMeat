# This file is used to connect to the database

import mysql.connector

# Connect to the database

db = mysql.connector.connect(
    host="localhost",  # XAMPP MySQL host
    user="root",  # Default XAMPP user
    password="",  # XAMPP default has no password
    database="web_appliction",  # Your database name
)

# Create a cursor object
cursor = db.cursor()
