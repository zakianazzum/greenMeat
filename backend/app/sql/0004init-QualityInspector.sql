CREATE TABLE IF NOT EXISTS QualityInspector(
   inspectorID INT AUTO_INCREMENT PRIMARY KEY,
   assignedZone VARCHAR(255),
   FOREIGN KEY (inspectorID) REFERENCES Users(id)
);