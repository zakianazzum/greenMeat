CREATE TABLE IF NOT EXISTS Warehouse(
	storeID INT AUTO_INCREMENT PRIMARY KEY, 
	packgedID INT,
	location VARCHAR(100),
	capacity INT,
	FOREIGN KEY (packgedID) REFERENCES packgedMeatBatch(packgedID)
);