CREATE TABLE IF NOT EXISTS InspectionReport(
   reportID INT AUTO_INCREMENT PRIMARY KEY,
    inspectorID INT,
    farmID INT,
    inspectionDate DATE,
    cropCondition VARCHAR(255),
    pestInfestation VARCHAR(255),
    recommendations TEXT,
    FOREIGN KEY (inspectorID) REFERENCES QualityInspector(inspectorID),
    FOREIGN KEY (farmID) REFERENCES Farm(farmID)
);