CREATE TABLE IF NOT EXISTS retailer_t(
	retailerId INT ,
	PRIMARY KEY (retailerId),
	CONSTRAINT retailerFK  FOREIGN KEY (retailerId) 
		REFERENCES user_t(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);