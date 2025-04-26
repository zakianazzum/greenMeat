CREATE TABLE IF NOT EXISTS MeatBatch(
	batchID INT AUTO_INCREMENT PRIMARY KEY,
	slaughterHouseId INT NOT NULL,
	productionDate DATE NOT NULL,
	averageWeight DECIMAL(10, 2) NOT NULL,
	categoryID INT NOT NULL,
	FOREIGN KEY (slaughterHouseId) REFERENCES SlaughterHouse(slaughterHouseId),
	FOREIGN KEY (categoryID) REFERENCES MeatCategory(categoryID),
);