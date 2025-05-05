CREATE TABLE IF NOT EXISTS farmer_t (
    farmerID INT,
    PRIMARY KEY (farmerID),
    CONSTRAINT farmerFK FOREIGN KEY (farmerID)
        REFERENCES user_t(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

