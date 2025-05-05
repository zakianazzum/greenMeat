UPDATE ShipmentTracking
SET status = CASE FLOOR(RAND() * 4)
    WHEN 0 THEN 'Scheduled'
    WHEN 1 THEN 'In Transit'
    WHEN 2 THEN 'Delivered'
    ELSE 'Delayed'
END;

