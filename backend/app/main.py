# Description: This is the main file of the backend. It contains all the API endpoints and database connection.
# Import necessary libraries

from typing import Union
from app.api.users import user_router
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

# Create an instance of FastAPI
app = FastAPI()

# Add CORS middleware to allow requests from the frontend
# This is necessary to allow requests from different origins
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
