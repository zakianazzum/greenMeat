CREATE TABLE IF NOT EXISTS slhrecord_t (
	slhRecordID INT AUTO_INCREMENT PRIMARY KEY,
	slaughterHouseId INT NOT NULL,
	cattleID INT NOT NULL,
	CONSTRAINT slhrecordFK1 FOREIGN KEY (slaughterHouseId) REFERENCES slaughterhouse_t(slaughterHouseId),
	CONSTRAINT slhrecordFK2 FOREIGN KEY (cattleID) REFERENCES cattle_t(cattleID)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);