CREATE TABLE IF NOT EXISTS Cattle(
	cattleID INT PRIMARY KEY,
	farmID INT,
	birthDate DATE,
	healthStatus VARCHAR(255),
	FOREIGN KEY (farmID) REFERENCES Farms(farmID),
);