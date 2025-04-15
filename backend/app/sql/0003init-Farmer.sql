CREATE TABLE IF NOT EXISTS Farmer(
    farmerID INT  PRIMARY KEY,
	farmRegion VARCHAR(255),
	FOREIGN KEY (farmerID) REFERENCES Users(id)
	FOREIGN KEY (farmRegion) REFERENCES Users(zoneId)
);