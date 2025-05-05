CREATE TABLE IF NOT EXISTS shipmenttracking_t (
	trackingID INT AUTO_INCREMENT PRIMARY KEY,
	retailerID INT NOT NULL,
	transportationID INT NOT NULL,
	packageID INT NOT NULL,
	depertureDate DATETIME NOT NULL,
	arrivalDate DATETIME ,
	longitude VARCHAR(255) NOT NULL,
	latitude VARCHAR(255) NOT NULL,
	status ENUM('In Transit', 'Delivered', 'Delayed') NOT NULL DEFAULT 'In Transit',
	CONSTRAINT shipmenttrackingFK1 FOREIGN KEY (retailerID) REFERENCES retailer_t(retailerID),
	CONSTRAINT shipmenttrackingFK2 FOREIGN KEY (transportationID) REFERENCES transportation_t(transportationID),
	CONSTRAINT ShipmentTrackingFK3 FOREIGN KEY (packageID) REFERENCES packagedmeatbatch_t(packageID)
	ON DELETE CASCADE
	ON UPDATE CASCADE
);