INSERT IGNORE INTO QualityInspector (inspectorID, assignedZone)
SELECT
	id,
	zone
FROM
	Users
WHERE
	user_Type = 'qualityinspector';