CREATE TABLE Shipment_Tracking (
    trackingID INT PRIMARY KEY,
    transportationID INT,
    retailerID INT,
    departureTime DATETIME,
    estimatedArrivalTime DATETIME,
    FOREIGN KEY (transportationID) REFERENCES Transportation(transportationID),
    FOREIGN KEY (retailerID) REFERENCES Retailer(retailerID)
);
