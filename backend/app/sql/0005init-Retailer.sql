CREATE TABLE IF NOT EXISTS Retailer(
	retailerId INT  AUTO_INCREMENT PRIMARY KEY,
	zone varchar(255),
	FOREIGN KEY (retailerId) REFERENCES Users(id)
);