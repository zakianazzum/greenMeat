-- Insert 5 cattle per farm
INSERT INTO Cattle (farmID, birthDate, healthStatus)
SELECT f.farmID,
       DATE_SUB(CURDATE(), INTERVAL FLOOR(RAND() * 730) DAY),
       ELT(
         FLOOR(1 + (RAND() * 4)),
         'Healthy',
         'Sick',
         'Under Observation',
         'Vaccinated'
       )
FROM Farms f;

-- Repeat 5 times
INSERT INTO Cattle (farmID, birthDate, healthStatus)
SELECT f.farmID,
       DATE_SUB(CURDATE(), INTERVAL FLOOR(RAND() * 730) DAY),
       ELT(
         FLOOR(1 + (RAND() * 4)),
         'Healthy',
         'Sick',
         'Under Observation',
         'Vaccinated'
       )
FROM Farms f;

INSERT INTO Cattle (farmID, birthDate, healthStatus)
SELECT f.farmID,
       DATE_SUB(CURDATE(), INTERVAL FLOOR(RAND() * 730) DAY),
       ELT(
         FLOOR(1 + (RAND() * 4)),
         'Healthy',
         'Sick',
         'Under Observation',
         'Vaccinated'
       )
FROM Farms f;

INSERT INTO Cattle (farmID, birthDate, healthStatus)
SELECT f.farmID,
       DATE_SUB(CURDATE(), INTERVAL FLOOR(RAND() * 730) DAY),
       ELT(
         FLOOR(1 + (RAND() * 4)),
         'Healthy',
         'Sick',
         'Under Observation',
         'Vaccinated'
       )
FROM Farms f;

INSERT INTO Cattle (farmID, birthDate, healthStatus)
SELECT f.farmID,
       DATE_SUB(CURDATE(), INTERVAL FLOOR(RAND() * 730) DAY),
       ELT(
         FLOOR(1 + (RAND() * 4)),
         'Healthy',
         'Sick',
         'Under Observation',
         'Vaccinated'
       )
FROM Farms f;

