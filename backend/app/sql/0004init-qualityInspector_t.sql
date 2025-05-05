CREATE TABLE IF NOT EXISTS qualityinspector_t(
   inspectorID INT,
   PRIMARY KEY (inspectorID),
   CONSTRAINT qualityinspectorFK FOREIGN KEY (inspectorID) 
   		REFERENCES user_t(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);