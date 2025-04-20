CREATE TABLE IF NOT EXISTS ProcessingRecord (
	recordID INT AUTO_INCREMENT PRIMARY KEY,
	batchID INT NOT NULL,
	plantID INT NOT NULL,
	packageQuality VARCHAR(255) NOT NULL,
	packagingDate DATE NOT NULL,
	packagingStatus VARCHAR(255) NOT NULL,
	FOREIGN KEY (batchID) REFERENCES MeatBatch(batchID),
	FOREIGN KEY (plantID) REFERENCES ProcessingPlant(plantID)
);