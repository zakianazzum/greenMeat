INSERT INTO
	GradingScoreRecord (criteriaID, reportID, score)
SELECT
	gc.criteriaID,
	ir.reportID,
	FLOOR(RAND () * 11) * 10 -- Random score in increments of 10 (0, 10, 20, ..., 100)
FROM
	GradingCriteria gc
	JOIN InspectionReport ir ON 1 = 1
ORDER BY
	RAND ()
LIMIT
	50;
