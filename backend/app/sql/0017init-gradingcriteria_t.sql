CREATE TABLE IF NOT EXISTS gradingcriteria_t(
	criteriaID INT AUTO_INCREMENT PRIMARY KEY,
	criteriaName VARCHAR(255) NOT NULL,
	description VARCHAR(255),
	maxScore INT NOT NULL
);