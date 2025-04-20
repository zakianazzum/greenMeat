CREATE TABLE Meat_Batch (
    batchID INT PRIMARY KEY,
    slaughterID INT,
    productionDate DATE,
    averageWeight FLOAT,
    categoryID INT,
    gradeID INT,
    FOREIGN KEY (slaughterID) REFERENCES Slaughter_House(slaughterID),
    FOREIGN KEY (categoryID) REFERENCES Meat_Category(categoryID),
    FOREIGN KEY (gradeID) REFERENCES Meat_Grade(gradeID)
);
