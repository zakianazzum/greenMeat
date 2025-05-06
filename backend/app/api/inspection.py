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
					"""SELECT ir.reportID,gr.batchID, gr.inspectorID, ir.inspectionDate, ir.totalScore, status, remarks
					FROM inspectionreport_t ir
					JOIN gradingscorerecord_t gr ON ir.gRecordID = gr.gRecordID
					WHERE YEAR(inspectionDate) IN (2024, 2025)
					ORDER BY YEAR(inspectionDate) DESC, inspectionDate DESC;  """
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
                gr.inspectorID,
                ir.totalScore,
                ir.status,
                ir.remarks,
                gr.batchID,
                mb.productionDate,
                mb.averageWeight,
                mc.categoryName,
                mg.gradeName,
                mg.description AS gradeDescription,
                u.name AS inspectorName
            FROM inspectionreport_t ir
            JOIN gradingscorerecord_t gr ON ir.gRecordID = gr.gRecordID
            JOIN meatbatch_t mb ON gr.batchID = mb.batchID
            JOIN meatcategory_t mc ON mb.categoryID = mc.categoryID
            JOIN meatgrade_t mg ON ir.gradeID = mg.gradeID
            JOIN user_t u ON gr.inspectorID = u.id
            WHERE ir.reportID = %s;
        """
        cursor.execute(query, (report_id,))
        result = cursor.fetchone()

        if not result:
            raise HTTPException(status_code=404, detail="Inspection report not found")
        return result

    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

    finally:
        cursor.close()


@inspection_router.get("/criteriaInfo/{report_id}")
async def get_inspection_report(report_id: int):
    cursor = db.cursor(dictionary=True)

    try:
        query = """
            SELECT 
                g.criteriaID,
                c.criteriaName,
                g.score
            FROM 
                inspectionreport_t AS r
            JOIN 
                gradingscorerecord_t AS g1 ON r.gRecordID = g1.gRecordID
            JOIN 
                gradingscorerecord_t AS g ON g.inspectorID = g1.inspectorID 
                                         AND g.batchID = g1.batchID
            JOIN 
                gradingcriteria_t AS c ON g.criteriaID = c.criteriaID
            WHERE 
                r.reportID = %s;
        """
        cursor.execute(query, (report_id,))
        results = cursor.fetchall()

        if not results:
            raise HTTPException(status_code=404, detail="Inspection report not found")

        return results

    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

    finally:
        cursor.close()


@inspection_router.get("/getBatchID")
async def get_batchID():
    cursor = db.cursor()
    try:
        cursor.execute("""SELECT batchId from meatbatch_t; """)
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
        cursor.execute("""SELECT inspectorID from qualityinspector_t; """)
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
            SELECT gradeID FROM meatbatch_t WHERE batchID = %s;
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
