CREATE TABLE IF NOT EXISTS InspectionReport (
	reportID INT AUTO_INCREMENT PRIMARY KEY,
	inspectionID INT NOT NULL,
	batchID INT NOT NULL,
	inspectionDate DATE NOT NULL,
	gradingScore INT NOT NULL,
	status VARCHAR(255) NOT NULL,
	remarks TEXT,
	gradeID INT NOT NULL,
	FOREIGN KEY (inspectionID) REFERENCES QualityInspector(inspectorID),
	FOREIGN KEY (batchID) REFERENCES MeatBatch(batchID),
	FOREIGN KEY (gradeID) REFERENCES MeatGrade(gradeID)
);