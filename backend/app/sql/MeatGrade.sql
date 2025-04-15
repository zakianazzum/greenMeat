CREATE TABLE IF NOT EXISTS MeatGrade(
   gradeID INT AUTO_INCREMENT PRIMARY KEY,
    batchID INT,
    gradeName VARCHAR(255),
    description TEXT,
    FOREIGN KEY (batchID) REFERENCES MeatBatch(batchID)
);