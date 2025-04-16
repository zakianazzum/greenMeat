INSERT IGNORE INTO MeatGrade (gradeName, description)
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
		'Select',
		'Acceptable quality, less marbling, reasonably tender, good for general use.'
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
	),
	(
		'Grade A',
		'High quality, minimal defects, suitable for all purposes'
	),
	(
		'Grade B',
		'Good quality, minor defects, suitable for most purposes'
	),
	(
		'Grade C',
		'Average quality, noticeable defects, may require specific preparation'
	),
	(
		'Not for Sale',
		'Unacceptable quality, significant defects, not for human consumption'
	);