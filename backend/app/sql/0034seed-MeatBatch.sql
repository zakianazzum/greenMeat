INSERT IGNORE INTO meatbatch_t (slaughterHouseId, productionDate, averageWeight, categoryID)
SELECT 
    sr.slaughterHouseId,
    
    -- Random date between 2024-08-01 and 2025-04-30
    DATE_ADD('2024-08-01', INTERVAL FLOOR(RAND() * TIMESTAMPDIFF(DAY, '2024-08-01', '2025-04-30')) DAY) AS productionDate,

    CASE c.cattleType
        WHEN 'beef' THEN 250.00
        WHEN 'lamb' THEN 30.00
        WHEN 'mutton' THEN 40.00
        WHEN 'chicken' THEN 2.50
        WHEN 'turkey' THEN 5.00
        ELSE 1.00
    END AS averageWeight,

    mc.categoryID
FROM slhrecord_t sr
JOIN cattle_t c ON sr.cattleID = c.cattleID
JOIN meatcategory_t mc ON LOWER(TRIM(mc.categoryName)) = LOWER(TRIM(c.cattleType))
GROUP BY sr.slaughterHouseId, c.cattleType, mc.categoryID;


