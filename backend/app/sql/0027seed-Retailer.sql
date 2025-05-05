INSERT IGNORE INTO retailer_t (retailerId)
SELECT
	id
FROM
	user_t
WHERE
	user_Type = 'retailer';
