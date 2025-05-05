INSERT IGNORE INTO gradingcriteria_t (criteriaName, description, maxScore)
VALUES
	(
		'Marbling',
		'Amount and distribution of intramuscular fat',
		10
	),
	('Color', 'Lean meat color', 10),
	('Texture', 'Meat firmness and feel', 10),
	('Maturity', 'Age of the animal', 10),
	('Defects', 'Presence of any defects', 5);
