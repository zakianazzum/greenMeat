CREATE TABLE IF NOT EXISTS processingrecord_t (
	recordID INT AUTO_INCREMENT PRIMARY KEY,
	batchID INT NOT NULL,
	plantID INT NOT NULL,
	packageQuality VARCHAR(255) NOT NULL,
	packagingDate DATE NOT NULL,
	packagingStatus VARCHAR(255) NOT NULL,
	CONSTRAINT processingplantFK1 FOREIGN KEY (batchID) REFERENCES meatbatch_t(batchID),
	CONSTRAINT processingplantFK2 FOREIGN KEY (plantID) REFERENCES processingplant_t(plantID)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);