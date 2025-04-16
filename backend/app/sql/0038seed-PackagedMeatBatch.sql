INSERT INTO
	PackagedMeatBatch (recordID, processedWeight, packagedUnits, storeID)
SELECT
	pr.recordID,
	ROUND(80 + (RAND () * 120), 2) AS processedWeight, -- 80kg to 200kg
	FLOOR(5 + RAND () * 15) AS packagedUnits, -- 5 to 20 units
	w.storeID
FROM
	(
		SELECT
			recordID
		FROM
			ProcessingRecord
		ORDER BY
			RAND ()
		LIMIT
			50
	) AS pr
	JOIN (
		SELECT
			storeID
		FROM
			Warehouse
		ORDER BY
			RAND ()
		LIMIT
			50
	) AS w ON 1 = 1
LIMIT
	50;
