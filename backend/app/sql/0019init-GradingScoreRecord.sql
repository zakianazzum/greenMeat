CREATE TABLE IF NOT EXISTS GradingScoreRecord (
	gRecordID INT AUTO_INCREMENT PRIMARY KEY,
	criteriaID INT NOT NULL,
	reportID INT NOT NULL,
	score INT NOT NULL,
	FOREIGN KEY (criteriaID) REFERENCES GradingCriteria (criteriaID),
	FOREIGN KEY (reportID) REFERENCES InspectionReport (reportID)
);