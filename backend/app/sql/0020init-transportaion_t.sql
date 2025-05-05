CREATE TABLE IF NOT EXISTS transportation_t (
	transportationID INT AUTO_INCREMENT PRIMARY KEY,
	transportationType VARCHAR(255) NOT NULL,
	transporterName VARCHAR(255) NOT NULL
);