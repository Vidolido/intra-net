export const formatKeyValue = (
	key,
	value,
	keyAlias = 'key',
	valueAlias = 'value'
) => {
	console.log(key, value, 'key/value in formatKeyValue');
	if (!key && !value) {
		return '/'; // A fallback when both are absent
	}

	// If only value is missing
	if (!value) {
		return `${keyAlias}: ${key}`;
	}

	// If only key is missing
	if (!key) {
		return `${valueAlias}: ${value}`;
	}

	// If both key and value are present
	return `${keyAlias}: ${key} / ${valueAlias}: ${value}`;
	// if (!value) {
	// 	return `${keyAlias}: ${key}`;
	// } else if (!key) {
	// 	return `${valueAlias}: ${value}`;
	// } else if (!key && !value) {
	// 	return '/';
	// } else if (key && value) {
	// 	return `${key} / ${value}`;
	// }
};
