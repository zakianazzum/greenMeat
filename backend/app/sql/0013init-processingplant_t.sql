CREATE TABLE IF NOT EXISTS processingplant_t (
	plantID INT AUTO_INCREMENT PRIMARY KEY,
	plantName VARCHAR(255) NOT NULL,
	location VARCHAR(255) NOT NULL,
	status VARCHAR(255) DEFAULT 'Currently Processing'
);