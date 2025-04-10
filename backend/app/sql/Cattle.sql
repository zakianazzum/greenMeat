CREATE TABLE IF NOT EXISTS Cattle(
   cattleID INT AUTO_INCREMENT PRIMARY KEY,
    farmID INT,
    breed VARCHAR(255),
    dateOfBirth DATE,
    healthStatus VARCHAR(255),
    FOREIGN KEY (farmID) REFERENCES Farm(farmID)
);