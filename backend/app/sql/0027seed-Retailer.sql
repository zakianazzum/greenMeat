INSERT IGNORE INTO Retailer (retailerId, zone)
SELECT
	id,
	zone
FROM
	Users
WHERE
	user_Type = 'retailer';
