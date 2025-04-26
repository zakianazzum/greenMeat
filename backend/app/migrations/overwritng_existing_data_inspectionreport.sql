UPDATE inspectionreport
SET status = CASE
    WHEN gradingScore >= 70 THEN 'Pass'
    WHEN gradingScore BETWEEN 50 AND 69 THEN 'Recheck'
    WHEN gradingScore < 50 THEN 'Fail'
END;