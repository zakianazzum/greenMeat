INSERT IGNORE INTO processingrecord_t (batchID, plantID, packageQuality, packagingDate, packagingStatus)
SELECT
    mb.batchID,
    -- Random plant assignment (just an example, adjust logic for plantID as needed)
    (SELECT plantID FROM processingplant_t ORDER BY RAND() LIMIT 1) AS plantID,
    -- Random distribution for packageQuality with better control
    CASE
        WHEN RAND() < 0.7 THEN 'A'   -- 70% 'A'
        WHEN RAND() < 0.9 THEN 'B'   -- 20% 'B'
        ELSE 'C'                    -- 10% 'C'
    END AS packageQuality,
    -- Random packaging date between August 2024 and April 2025
    DATE_ADD('2024-08-01', INTERVAL FLOOR(RAND() * TIMESTAMPDIFF(DAY, '2024-08-01', '2025-04-30')) DAY) AS packagingDate,
    -- Assign packaging status based on packageQuality
    CASE
        WHEN RAND() < 0.7 THEN 'successful'    -- 'A' -> 'successful'
        WHEN RAND() < 0.9 THEN 'in-progress'   -- 'B' -> 'in-progress'
        ELSE 'failed'                          -- 'C' -> 'failed'
    END AS packagingStatus
FROM meatbatch_t mb
LIMIT 100;  -- Limit to 100 records

