INSERT IGNORE INTO SensorData (
	trackingID,
	sensorID,
	recordedAt,
	temperature,
	humidity
)
SELECT
	st.trackingID,
	s.sensorID,
	DATE_SUB(CURDATE(), INTERVAL FLOOR(RAND() * 30) DAY),
	CONCAT(ROUND(RAND() * 5, 2), ' °C'),
	CONCAT(ROUND(50 + (RAND() * 50), 2), ' %')
FROM
	ShipmentTracking st
	JOIN Sensor s ON 1 = 1
ORDER BY
	RAND()
LIMIT
	50;
