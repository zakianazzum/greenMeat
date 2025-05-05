INSERT IGNORE INTO farmer_t (farmerID)
SELECT
	id
FROM
	user_t
WHERE
	user_Type = 'farmer';