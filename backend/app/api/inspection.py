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
            """SELECT ir.reportID, gr.gRecordID, gr.batchID, gr.inspectorID, ir.inspectionDate, ir.totalScore, status, remarks, ir.gradeID
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
            "gRecordID": row[1],
            "batchId": row[2],
            "inspectorId": row[3],
            "date": row[4],
            "score": row[5],
            "status": row[6],
            "remarks": row[7],
            "gradeID": row[8],
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
                c.criteriaName,
                g.score,
                c.description
                
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

        # Extract required fields from request
        g_record_id = data.get("gRecordID")
        inspection_date = data.get("inspectionDate")
        total_score = data.get("totalScore")
        status = data.get("status")
        remarks = data.get("remarks")
        grade_id = data.get("gradeID")

        # Validate required fields
        if not all([g_record_id, inspection_date, total_score, status, grade_id]):
            raise HTTPException(status_code=400, detail="Missing required fields")

        # Insert new inspection report
        query = """
            INSERT INTO inspectionreport_t 
            (gRecordID, inspectionDate, totalScore, status, remarks, gradeID)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(
            query,
            (g_record_id, inspection_date, total_score, status, remarks, grade_id),
        )

        db.commit()
        new_report_id = cursor.lastrowid

        return {
            "message": "Inspection report created successfully",
            "reportID": new_report_id,
        }

    except mysql.connector.Error as err:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    finally:
        cursor.close()


@inspection_router.put("/inspectionReport/{report_id}")
async def update_inspection_report(report_id: int, request: Request):
    cursor = db.cursor()
    try:
        data = await request.json()

        # Extract fields from request
        inspection_date = data.get("inspectionDate")
        total_score = data.get("totalScore")
        status = data.get("status")
        remarks = data.get("remarks")
        grade_id = data.get("gradeID")

        # Validate required fields
        if not all([inspection_date, total_score, status, grade_id]):
            raise HTTPException(status_code=400, detail="Missing required fields")

        # Update inspection report
        query = """
            UPDATE inspectionreport_t 
            SET inspectionDate = %s,
                totalScore = %s,
                status = %s,
                remarks = %s,
                gradeID = %s
            WHERE reportID = %s
        """
        cursor.execute(
            query, (inspection_date, total_score, status, remarks, grade_id, report_id)
        )

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Inspection report not found")

        db.commit()
        return {"message": "Inspection report updated successfully"}

    except mysql.connector.Error as err:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    finally:
        cursor.close()


@inspection_router.delete("/inspectionReport/{report_id}")
async def delete_inspection_report(report_id: int):
    cursor = db.cursor()
    try:
        # Delete inspection report
        query = "DELETE FROM inspectionreport_t WHERE reportID = %s"
        cursor.execute(query, (report_id,))

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Inspection report not found")

        db.commit()
        return {"message": "Inspection report deleted successfully"}

    except mysql.connector.Error as err:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    finally:
        cursor.close()
