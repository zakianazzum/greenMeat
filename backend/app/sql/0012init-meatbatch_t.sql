CREATE TABLE IF NOT EXISTS meatbatch_t(
	batchID INT AUTO_INCREMENT PRIMARY KEY,
	slaughterHouseId INT NOT NULL,
	productionDate DATE NOT NULL,
	averageWeight DECIMAL(10, 2) NOT NULL,
	categoryID INT NOT NULL,
	CONSTRAINT meatbatchFK1 FOREIGN KEY (slaughterHouseId) REFERENCES slaughterhouse_t(slaughterHouseId),
	CONSTRAINT meatbatchFK2 FOREIGN KEY (categoryID) REFERENCES meatcategory_t(categoryID)
	    ON DELETE CASCADE
	    ON UPDATE CASCADE
);