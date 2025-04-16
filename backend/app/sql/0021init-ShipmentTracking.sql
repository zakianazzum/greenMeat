CREATE TABLE IF NOT EXISTS ShipmentTracking (
	trackingID INT AUTO_INCREMENT PRIMARY KEY,
	retailerID INT NOT NULL,
	transportationID INT NOT NULL,
	packageID INT NOT NULL,
	depertureDate DATETIME NOT NULL,
	arrivalDate DATETIME NOT NULL,
	temperature VARCHAR(255) NOT NULL,
	longitude VARCHAR(255) NOT NULL,
	latitude VARCHAR(255) NOT NULL,
	FOREIGN KEY (retailerID) REFERENCES Retailer(retailerID),
	FOREIGN KEY (transportationID) REFERENCES Transportation(transportationID),
	FOREIGN KEY (packageID) REFERENCES PackagedMeatBatch(packageID)
);