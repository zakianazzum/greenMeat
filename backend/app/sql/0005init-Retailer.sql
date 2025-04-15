CREATE TABLE IF NOT EXISTS Retailer(
	retailerId INT PPRIMARY KEY,
	zone varchar(255),
	FOREIGN KEY (retailerId) REFERENCES Users(id)
	FOREIGN KEY (zone) REFERENCES Users(zoneId)
)