CREATE TABLE IF NOT EXISTS SensorData(
   dataID INT AUTO_INCREMENT PRIMARY KEY,
    sensorID INT,
    timestamp DATETIME,
    value DECIMAL(10, 2),
    unit VARCHAR(50),
    FOREIGN KEY (sensorID) REFERENCES Sensor(sensorID)
);