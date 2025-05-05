UPDATE InspectionReport
SET remarks = CASE
    WHEN status = 'Pass' THEN 'No Issues.'
    WHEN status = 'Fail' THEN 'Quality concerns detected.'
    WHEN status = 'Recheck' THEN 'Requires further inspection.'
    ELSE remarks
END;
