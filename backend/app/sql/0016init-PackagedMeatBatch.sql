CREATE TABLE IF NOT EXISTS PackagedMeatBatch(
	packageID INT AUTO_INCREMENT PRIMARY KEY,
	recordID INT NOT NULL,
	processedWeight DECIMAL(10, 2) NOT NULL,
	packagedUnits INT NOT NULL,
	storeID INT NOT NULL,
	FOREIGN KEY (recordID) REFERENCES ProcessingRecord(recordID),
	FOREIGN KEY (storeID) REFERENCES Warehouse(storeID)
);