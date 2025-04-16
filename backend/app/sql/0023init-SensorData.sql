CREATE TABLE IF NOT EXISTS SensorData(
   dataID INT AUTO_INCREMENT PRIMARY KEY,
   trackingID INT NOT NULL,
   sensorID INT NOT NULL,
   recordedAt DATETIME NOT NULL,
   temperature VARCHAR(255) NOT NULL,
   humidity VARCHAR(255) NOT NULL,
   FOREIGN KEY (trackingID) REFERENCES ShipmentTracking(trackingID),
   FOREIGN KEY (sensorID) REFERENCES Sensor(sensorID)
);