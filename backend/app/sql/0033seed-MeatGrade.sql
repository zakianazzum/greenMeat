INSERT IGNORE INTO meatgrade_t (gradeName, description)
VALUES
	(
		'Prime',
		'Exceptional quality, high marbling, very tender, ideal for premium cuts.'
	),
	(
		'Choice',
		'High quality, good marbling, tender, suitable for most retail cuts.'
	),
	
	(
		'Standard',
		'Saleable, but with less tenderness, may require longer cooking times.'
	),
	(
		'Commercial',
		'Lower quality, lacks tenderness, often used in ground meat or processing.'
	),
	(
		'Reject',
		'Unsuitable for sale to consumers due to significant quality defects.'
	)
	
	;