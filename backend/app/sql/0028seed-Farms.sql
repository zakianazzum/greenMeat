-- Insert 2 farms per farmer
INSERT INTO
	Farms (farmerID)
SELECT
	id
FROM
	Users
WHERE
	user_type = 'farmer'
UNION ALL
SELECT
	id
FROM
	Users
WHERE
	user_type = 'farmer';
