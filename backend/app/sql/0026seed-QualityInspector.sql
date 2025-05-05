INSERT IGNORE INTO qualityinspector_t (inspectorID)
SELECT
	id
FROM
	user_t
WHERE
	user_Type = 'qualityinspector';