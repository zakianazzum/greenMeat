CREATE TABLE IF NOT EXISTS cattle_t (
	cattleID INT AUTO_INCREMENT PRIMARY KEY,
	farmID INT,
	cattleType VARCHAR(255),
	age INT,
	healthStatus ENUM('healthy', 'sick'),
	CONSTRAINT cattleFK FOREIGN KEY(farmID) REFERENCES farms_t(farmID)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);