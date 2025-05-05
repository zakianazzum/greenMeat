INSERT IGNORE INTO packagedmeatbatch_t (recordID, processedWeight, packagedUnits, storeID)
SELECT
    pr.recordID,
    -- Random processed weight between 10 and 50 kg (you can adjust this range)
    ROUND(10 + (RAND() * 40), 2) AS processedWeight,
    -- Random packaged units between 5 and 20 (you can adjust this range)
    FLOOR(5 + (RAND() * 15)) AS packagedUnits,
    -- Random storeID from warehouse in the same zone as processing plant
    w.storeID
FROM
    processingrecord_t pr
JOIN processingplant_t pp ON pr.plantID = pp.plantID
JOIN warehouse_t w ON pp.location = w.location
WHERE
    pr.packageQuality = 'A'
    AND pr.packagingStatus = 'successful'
LIMIT 100;  -- Adjust the limit based on the number of records you want to insert

