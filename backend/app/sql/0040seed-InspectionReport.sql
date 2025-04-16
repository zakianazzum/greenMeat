INSERT IGNORE INTO InspectionReport (
    inspectionID,
    batchID,
    inspectionDate,
    gradingScore,
    status,
    remarks,
    gradeID
)
SELECT
    qi.inspectorID,
    mb.batchID,
    CURDATE() - INTERVAL FLOOR(RAND()*730) DAY,  -- Random date in last 2 years
    FLOOR(RAND()*101),                          -- Grading score from 0 to 100
    CASE
        WHEN FLOOR(RAND()*3) = 0 THEN 'Pass'
        WHEN FLOOR(RAND()*3) = 1 THEN 'Fail'
        ELSE 'Recheck'
    END AS status,
    CASE
        WHEN FLOOR(RAND()*3) = 0 THEN 'No issues.'
        WHEN FLOOR(RAND()*3) = 1 THEN 'Quality concerns detected.'
        ELSE 'Requires further inspection.'
    END AS remarks,
    mg.gradeID
FROM
    QualityInspector qi
    JOIN MeatBatch mb ON 1=1
    JOIN MeatGrade mg ON 1=1
ORDER BY
    RAND()
LIMIT 50;
