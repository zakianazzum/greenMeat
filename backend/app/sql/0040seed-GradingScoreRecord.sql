-- Step 1: Populate gradingscorerecord_t for first 25 meat batches
-- This uses a JOIN with inspectors and LIMITs to the first 25 batches

INSERT IGNORE INTO gradingscorerecord_t (criteriaID, inspectorID, batchID, score)
SELECT 
    c.criteriaID,
    qi.inspectorID,
    mb.batchID,
    CASE 
        WHEN mb.batchID % 5 = 0 THEN FLOOR(RAND() * 3) + 3         -- 15-18 total -> Reject
        WHEN mb.batchID % 5 = 1 THEN FLOOR(RAND() * 5) + 5         -- 24-28 -> Commercial
        WHEN mb.batchID % 5 = 2 THEN FLOOR(RAND() * 5) + 6         -- 30-35 -> Standard
        WHEN mb.batchID % 5 = 3 THEN FLOOR(RAND() * 4) + 7         -- 35-39 -> Choice
        ELSE FLOOR(RAND() * 3) + 9                                 -- 42-45 -> Prime
    END AS score
FROM (
    SELECT batchID FROM meatbatch_t ORDER BY batchID LIMIT 25
) mb
JOIN (
    SELECT 1 AS criteriaID UNION ALL
    SELECT 2 UNION ALL
    SELECT 3 UNION ALL
    SELECT 4 UNION ALL
    SELECT 5
) c
JOIN (
    SELECT inspectorID FROM qualityinspector_t ORDER BY inspectorID LIMIT 1
) qi
ON 1=1;
