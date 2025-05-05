-- Step 1: Insert for top 5 oldest farmers (1 active, 1 inactive)
INSERT IGNORE INTO farms_t (farmerID, isActive)
SELECT * FROM (
    SELECT id, TRUE AS isActive
    FROM user_t
    WHERE user_type = 'farmer'
    ORDER BY created_at ASC
    LIMIT 5
) AS active_top5
UNION ALL
SELECT * FROM (
    SELECT id, FALSE AS isActive
    FROM user_t
    WHERE user_type = 'farmer'
    ORDER BY created_at ASC
    LIMIT 5
) AS inactive_top5;

-- Step 2: Insert for the rest of the farmers (2 active farms each)
INSERT IGNORE NTO farms_t (farmerID, isActive)
SELECT * FROM (
    SELECT id, TRUE AS isActive
    FROM user_t
    WHERE user_type = 'farmer'
      AND id NOT IN (
          SELECT id FROM (
              SELECT id
              FROM user_t
              WHERE user_type = 'farmer'
              ORDER BY created_at ASC
              LIMIT 5
          ) AS top5
      )
) AS active_rest
UNION ALL
SELECT * FROM (
    SELECT id, TRUE AS isActive
    FROM user_t
    WHERE user_type = 'farmer'
      AND id NOT IN (
          SELECT id FROM (
              SELECT id
              FROM user_t
              WHERE user_type = 'farmer'
              ORDER BY created_at ASC
              LIMIT 5
          ) AS top5_dup
      )
) AS active_rest_2;
