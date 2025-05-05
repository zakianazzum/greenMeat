-- Insert first animal for each active farm
INSERT IGNORE INTO cattle_t (farmID, cattleType, age, healthStatus)
SELECT 
    f.farmID,
    'beef' AS cattleType,  -- Example: Beef cattle
    FLOOR(RAND() * 19) + 18 AS age,  -- Random age between 18 and 36 months
    CASE
        WHEN RAND() < 0.7 THEN 'healthy'  -- 70% chance of healthy
        ELSE 'sick'  -- 30% chance of sick
    END AS healthStatus
FROM 
    farms_t f
WHERE 
    f.isActive = TRUE;


-- Insert second animal (lamb) for each active farm
INSERT IGNORE INTO cattle_t (farmID, cattleType, age, healthStatus)
SELECT 
    f.farmID,
    'lamb' AS cattleType,
    FLOOR(RAND() * 9) + 4 AS age,  -- Random age between 4 and 12 months
    CASE
        WHEN RAND() < 0.7 THEN 'healthy'
        ELSE 'sick'
    END AS healthStatus
FROM 
    farms_t f
WHERE 
    f.isActive = TRUE;


-- Insert goat animals for each active farm
INSERT IGNORE INTO cattle_t (farmID, cattleType, age, healthStatus)
SELECT 
    f.farmID,
    'mutton' AS cattleType,
    FLOOR(RAND() * 10) + 1 AS age,  -- Random age between 1 and 10 months
    CASE
        WHEN RAND() < 0.7 THEN 'healthy'  -- 70% chance of healthy
        ELSE 'sick'  -- 30% chance of sick
    END AS healthStatus
FROM 
    farms_t f
WHERE 
    f.isActive = TRUE;


-- Insert turkey animals for each active farm
INSERT IGNORE INTO cattle_t (farmID, cattleType, age, healthStatus)
SELECT 
    f.farmID,
    'turkey' AS cattleType,
    FLOOR(RAND() * 6) + 1 AS age,  -- Random age between 1 and 6 months
    CASE
        WHEN RAND() < 0.7 THEN 'healthy'  -- 70% chance of healthy
        ELSE 'sick'  -- 30% chance of sick
    END AS healthStatus
FROM 
    farms_t f
WHERE 
    f.isActive = TRUE;


-- Insert chicken animals for each active farm
INSERT IGNORE INTO cattle_t (farmID, cattleType, age, healthStatus)
SELECT 
    f.farmID,
    'chicken' AS cattleType,
    FLOOR(RAND() * 6) + 1 AS age,  -- Random age between 1 and 6 months
    CASE
        WHEN RAND() < 0.7 THEN 'healthy'  -- 70% chance of healthy
        ELSE 'sick'  -- 30% chance of sick
    END AS healthStatus
FROM 
    farms_t f
WHERE 
    f.isActive = TRUE;
