INSERT IGNORE INTO slhrecord_t (slaughterHouseId, cattleID)
SELECT sh.slaughterHouseId, c.cattleID
FROM cattle_t c
JOIN farms_t f ON c.farmID = f.farmID
JOIN user_t u ON f.farmerID = u.id
JOIN slaughterhouse_t sh ON u.zone = sh.zone
LEFT JOIN slhrecord_t sr ON sr.cattleID = c.cattleID
WHERE sr.cattleID IS NULL
  AND (
    (c.cattleType = 'beef' AND c.age BETWEEN 18 AND 36) OR
    (c.cattleType = 'lamb' AND c.age BETWEEN 4 AND 12) OR
    (c.cattleType IN ('mutton', 'chicken', 'turkey') AND c.age >= 2)
  )
LIMIT 50;
