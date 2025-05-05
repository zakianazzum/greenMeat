CREATE TABLE IF NOT EXISTS sensordata_t(
   dataID INT AUTO_INCREMENT PRIMARY KEY,
   trackingID INT NOT NULL,
   sensorID INT NOT NULL,
   recordedAt DATETIME NOT NULL,
   temperature VARCHAR(255) NOT NULL,
   humidity VARCHAR(255) NOT NULL,
   CONSTRAINT sensordataFK1 FOREIGN KEY (trackingID) REFERENCES shipmenttracking_t(trackingID),
   CONSTRAINT sensordataFK2 FOREIGN KEY (sensorID) REFERENCES sensor_t(sensorID)
   ON DELETE CASCADE
   ON UPDATE CASCADE
);