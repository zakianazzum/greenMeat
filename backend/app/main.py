# Description: This is the main file of the backend. It contains all the API endpoints and database connection.
# Import necessary libraries

# from typing import Union
from app.api.users import user_router 
from app.api.dashboard import dashboard_router
  # Import the user router from the users module

# from fastapi import FastAPI  # Import FastAPI for creating the web application
from fastapi import FastAPI  # Import FastAPI for creating the web application
from fastapi.middleware.cors import (
    CORSMiddleware,
)  # Import CORSMiddleware for handling CORS (Cross-Origin Resource Sharing)

# Import the necessary modules for handling CORS (Cross-Origin Resource Sharing)


# Create an instance of FastAPI
app = FastAPI()

# Add CORS middleware to allow requests from the frontend
# This is necessary to allow requests from different origins
origins = ["*"]  # Allow requests from any origin
# You can specify a list of allowed origins instead of "*"

app.add_middleware(  # Add CORS middleware to the FastAPI app
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Define the CORS middleware to handle cross-origin requests
# This middleware allows requests from the specified origins and methods
app.include_router(user_router)
app.include_router(dashboard_router)  # Include the user router in the FastAPI app
# This allows the app to handle user-related API endpoints defined in the user_router module
