CREATE TABLE IF NOT EXISTS gradingscorerecord_t (
	gRecordID INT AUTO_INCREMENT PRIMARY KEY,
	criteriaID INT,
	inspectorID INT NOT NULL,
	batchID INT NOT NULL,
	score INT ,
	CONSTRAINT gradingscorerecordFK1 FOREIGN KEY (criteriaID) REFERENCES gradingcriteria_t(criteriaID),
	CONSTRAINT gradingscorerecordFK2 FOREIGN KEY (inspectorID) REFERENCES qualityinspector_t(inspectorID),
	CONSTRAINT gradingscorerecordFK3 FOREIGN KEY (batchID) REFERENCES meatbatch_t(batchID)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);