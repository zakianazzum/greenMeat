from jose import JWTError, jwt
from datetime import datetime, timedelta

import datetime
from fastapi import (
    Depends,
    Request,
    APIRouter,
    HTTPException,
)
import mysql
import mysql.connector  # Import APIRouter for creating API endpoints and Request for handlling HTTP requests.
from app.db.db import (
    get_db_connection,
)  # Import the database connection object 'db from the app/db/db.py' file.


SECRET_KEY = "your-secret"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

db = get_db_connection(False)


inspection_router = APIRouter()


@inspection_router.get("/inspectionReport")
async def get_inspection_report():

    cursor = db.cursor()
    try:
        cursor.execute(
            """SELECT reportID,batchID, inspectionID, inspectionDate, gradingScore, status, remarks
			FROM inspectionreport
			WHERE YEAR(inspectionDate) IN (2024, 2025)
			ORDER BY YEAR(inspectionDate) DESC, inspectionDate DESC; """
        )
        result = cursor.fetchall()
    except mysql.connector.error as err:
        cursor.close()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

    formatted_result = [
        {
            "id": row[0],
            "batchId": row[1],
            "inspectorId": row[2],
            "date": row[3],
            "score": row[4],
            "status": row[5],
            "remarks": row[6],
        }
        for row in result
    ]
    return formatted_result


@inspection_router.get("/inspectionReport/{report_id}")
async def get_inspection_report(report_id: int):
    cursor = db.cursor(dictionary=True)

    try:
        query = """
					SELECT 
						ir.reportID,
						ir.inspectionID AS inspectorID,
						ir.batchID,
						ir.inspectionDate,
						ir.gradingScore,
						ir.status,
						ir.remarks,
						mb.productionDate,
						mb.averageWeight,
						mc.categoryName,
						mg.gradeName,
						mg.description AS gradeDescription,
						u.name AS inspectorName,
						gc.criteriaName,
						gc.description AS criteriaDescription,
						gsr.score
					FROM inspectionreport ir
					JOIN meatbatch mb ON ir.batchID = mb.batchID
					JOIN meatcategory mc ON mb.categoryID = mc.categoryID
					JOIN meatgrade mg ON ir.gradeID = mg.gradeID
					JOIN users u ON ir.inspectionID = u.id
					JOIN gradingscorerecord gsr ON ir.reportID = gsr.reportID
					JOIN gradingcriteria gc ON gsr.criteriaID = gc.criteriaID
					WHERE ir.reportID = %s;"""
        cursor.execute(query, (report_id,))
        result = cursor.fetchall()

        formattedDict = {}
        formattedDict["status"] = result[0]["status"]
        formattedDict["remarks"] = result[0]["remarks"]
        formattedDict["batchID"] = result[0]["batchID"]
        formattedDict["reportID"] = result[0]["reportID"]
        formattedDict["gradeName"] = result[0]["gradeName"]
        formattedDict["inspectorID"] = result[0]["inspectorID"]
        formattedDict["categoryName"] = result[0]["categoryName"]
        formattedDict["gradingScore"] = result[0]["gradingScore"]
        formattedDict["inspectorName"] = result[0]["inspectorName"]
        formattedDict["averageWeight"] = result[0]["averageWeight"]
        formattedDict["productionDate"] = result[0]["productionDate"]
        formattedDict["gradeDescription"] = result[0]["gradeDescription"]

        formattedCriterias = []

        for i in result:
            criteriaDict = {}
            criteriaDict["criteriaName"] = i["criteriaName"]
            criteriaDict["criteriaDescription"] = i["criteriaDescription"]
            criteriaDict["score"] = i["score"]

            formattedCriterias.append(criteriaDict)

        formattedDict["criteria"] = formattedCriterias

        if not result:
            raise HTTPException(status_code=404, detail="Inspection report not found")
        return formattedDict

    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

    finally:
        cursor.close()


@inspection_router.get("/getBatchID")
async def get_batchID():
    cursor = db.cursor()
    try:
        cursor.execute("""SELECT batchId from meatbatch; """)
        result = cursor.fetchall()
    except mysql.connector.Error as err:
        cursor.close()
        raise HTTPException(status_code=500, detail=f"Database error as {err}")
    formatted_result = [row[0] for row in result]
    return formatted_result


@inspection_router.get("/inspectorID")
async def get_inspectorID():
    cursor = db.cursor()
    try:
        cursor.execute("""SELECT inspectorID from qualityinspector; """)
        result = cursor.fetchall()

    except mysql.connector.Error as err:
        cursor.close()
        raise HTTPException(status_code=500, detail=f"Database error as {err}")

    formatted_result = [row[0] for row in result]
    return formatted_result


@inspection_router.post("/newInspectionReport")
async def create_inspection_report(request: Request):
    cursor = db.cursor()
    try:
        data = await request.json()
        batchID = data.get("batchID")
        inspectionID = data.get("inspectorID")
        inspectionDate = data.get("inspectionDate")
        gradingScore = data.get("gradingScore")
        status = data.get("status")
        remarks = data.get("remarks")

        # Fetch gradeID from meatbatch table using batchID
        cursor.execute(
            """
            SELECT gradeID FROM meatbatch WHERE batchID = %s;
            """,
            (batchID,),
        )
        grade_result = cursor.fetchone()

        if not grade_result:
            raise HTTPException(
                status_code=404, detail="Batch not found or no gradeID available"
            )

        gradeID = grade_result[0]

        # Insert the new inspection report into the database
        cursor.execute(
            """
            INSERT INTO inspectionreport (inspectionID, batchID,  inspectionDate, gradingScore, status, remarks, gradeID)
            VALUES (%s, %s, %s, %s, %s, %s, %s);
            """,
            (
                inspectionID,
                batchID,
                inspectionDate,
                gradingScore,
                status,
                remarks,
                gradeID,
            ),
        )
        db.commit()

        return {"message": "Inspection report created successfully"}

    except mysql.connector.Error as err:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    finally:
        cursor.close()
