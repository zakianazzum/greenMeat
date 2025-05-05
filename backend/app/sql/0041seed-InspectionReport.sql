INSERT IGNORE INTO inspectionreport_t (
    gRecordID,
    inspectionDate,
    totalScore,
    status,
    remarks,
    gradeID
)
SELECT 
    MIN(gr.gRecordID) AS gRecordID,  -- Use one gRecordID per batch
    CURDATE() AS inspectionDate,
    SUM(gr.score) AS totalScore,
    CASE
        WHEN SUM(gr.score) >= 42 THEN 'Passed'
        WHEN SUM(gr.score) >= 35 THEN 'Passed with minor issues'
        WHEN SUM(gr.score) >= 28 THEN 'Satisfactory'
        WHEN SUM(gr.score) >= 20 THEN 'Below Standard'
        ELSE 'Rejected'
    END AS status,
    'Auto-generated report' AS remarks,
    CASE
        WHEN SUM(gr.score) >= 42 THEN (SELECT gradeID FROM meatgrade_t WHERE gradeName = 'Prime')
        WHEN SUM(gr.score) >= 35 THEN (SELECT gradeID FROM meatgrade_t WHERE gradeName = 'Choice')
        WHEN SUM(gr.score) >= 28 THEN (SELECT gradeID FROM meatgrade_t WHERE gradeName = 'Standard')
        WHEN SUM(gr.score) >= 20 THEN (SELECT gradeID FROM meatgrade_t WHERE gradeName = 'Commercial')
        ELSE (SELECT gradeID FROM meatgrade_t WHERE gradeName = 'Reject')
    END AS gradeID
FROM gradingscorerecord_t gr
GROUP BY gr.batchID;
