CREATE TABLE IF NOT EXISTS ProcessingRecord(
	recordID INT AUTO_INCREMENT PRIMARY KEY,
	batchID INT,
	packgedQuantity INT,
	packagingDate DATE, 
	packagingStatus varchar(50) 
	 
);