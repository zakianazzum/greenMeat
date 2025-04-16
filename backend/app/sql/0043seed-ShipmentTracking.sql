INSERT IGNORE INTO ShipmentTracking (
    retailerID,
    transportationID,
    packageID,
    depertureDate,
    arrivalDate,
    temperature,
    longitude,
    latitude
)
SELECT
    derived.retailerID,
    derived.transportationID,
    derived.packageID,
    DATE_SUB(CURDATE(), INTERVAL derived.d DAY) AS depertureDate,
    DATE_ADD(DATE_SUB(CURDATE(), INTERVAL derived.d DAY), INTERVAL derived.ad DAY) AS arrivalDate,
    CONCAT(ROUND(RAND() * 5, 2), '°C'),
    ROUND(88.0 + (RAND() * 5), 6),
    ROUND(20.5 + (RAND() * 6), 6)
FROM (
    SELECT
        r.retailerID,
        t.transportationID,
        pm.packageID,
        FLOOR(RAND() * 30) AS d,
        CASE
            WHEN RAND() < 0.9 THEN FLOOR(RAND() * 2) + 1
            ELSE FLOOR(RAND() * 3) + 3
        END AS ad
    FROM
        Retailer r
        JOIN Transportation t ON 1 = 1
        JOIN PackagedMeatBatch pm ON 1 = 1
    ORDER BY
        RAND()
    LIMIT 50
) AS derived;

