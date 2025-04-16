-- Insert 5 SLHRecord entries per cattle, with random recordID (slaughterHouseId)
INSERT IGNORE INTO SLHRecord (recordID, cattleID)
SELECT
	sh.slaughterHouseId,
	c.cattleID
FROM
	Cattle c
	JOIN SlaughterHouse sh -- Assuming SlaughterHouse table has some records already
ORDER BY
	RAND ()
LIMIT
	10;
