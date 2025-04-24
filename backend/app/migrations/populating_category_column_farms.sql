UPDATE farms
SET category = CASE
    WHEN RAND() < 0.33 THEN 'Premium'
    WHEN RAND() < 0.66 THEN 'Standard'
    ELSE 'Economy'
END;