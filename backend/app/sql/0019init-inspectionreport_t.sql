CREATE TABLE IF NOT EXISTS inspectionreport_t (
	reportID INT AUTO_INCREMENT PRIMARY KEY,
	gRecordID INT,
	inspectionDate DATE NOT NULL,
	totalScore INT NOT NULL,
	status VARCHAR(255) NOT NULL,
	remarks TEXT,
	gradeID INT NOT NULL,
	CONSTRAINT inspectionreportFK1 FOREIGN KEY (gradeID) REFERENCES meatgrade_t(gradeID),
	CONSTRAINT inspectionreportFK2 FOREIGN KEY (gRecordID) REFERENCES gradingscorerecord_t(gRecordID)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);