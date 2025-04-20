INSERT IGNORE INTO ProcessingRecord (
    batchID,
    plantID,
    packageQuality,
    packagingDate,
    packagingStatus
)
SELECT
    mb.batchID,
    pp.plantID,
    IF(
        FLOOR(RAND()*3) = 0,
        'Excellent',
        IF(FLOOR(RAND()*3) = 1, 'Good', 'Average')
    ) AS packageQuality,
    DATE_ADD(
        mb.productionDate,
        INTERVAL FLOOR(RAND()*10) DAY
    ) AS packagingDate,
    IF(
        FLOOR(RAND()*3) = 0,
        'Sealed',
        IF(FLOOR(RAND()*3) = 1, 'Leaky', 'Damaged')
    ) AS packagingStatus
FROM (
    SELECT
        batchID,
        productionDate
    FROM
        MeatBatch
    ORDER BY
        RAND()
    LIMIT 50
) AS mb
JOIN (
    SELECT
        plantID
    FROM
        ProcessingPlant
    ORDER BY
        RAND()
    LIMIT 50
) AS pp;

