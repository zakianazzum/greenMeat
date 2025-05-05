CREATE TABLE IF NOT EXISTS packagedmeatbatch_t(
	packageID INT AUTO_INCREMENT PRIMARY KEY,
	recordID INT NOT NULL,
	processedWeight DECIMAL(10, 2) NOT NULL,
	packagedUnits INT NOT NULL,
	storeID INT NOT NULL,
	CONSTRAINT fk_packagedmeatbatch_recordID FOREIGN KEY (recordID) REFERENCES processingrecord_t(recordID),
	CONSTRAINT fk_packagedmeatbatch_storeID FOREIGN KEY (storeID) REFERENCES warehouse_t(storeID)
	ON DELETE CASCADE
	ON UPDATE CASCADE
);