INSERT IGNORE INTO MeatBatch (
    slaughterHouseId,
    productionDate,
    averageWeight,
    qualityStatus,
    categoryID,
    gradeID
)
SELECT
    sh.slaughterHouseId,
    ADDDATE(CURDATE(), INTERVAL -FLOOR(RAND() * 730) DAY),
    ROUND(100 + RAND() * 300, 2),
    CASE
        WHEN FLOOR(RAND() * 3) = 0 THEN 'Pass'
        WHEN FLOOR(RAND() * 3) = 1 THEN 'Fail'
        ELSE 'Recheck'
    END,
    mc.categoryID,
    mg.gradeID
FROM SlaughterHouse sh
CROSS JOIN MeatCategory mc
CROSS JOIN MeatGrade mg
ORDER BY RAND()
LIMIT 50;

