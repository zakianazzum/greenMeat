INSERT IGNORE INTO Farmer (farmerID, farmRegion)
SELECT
	id,
	zone
FROM
	Users
WHERE
	user_Type = 'farmer';