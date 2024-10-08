export const formatKeyValue = (
	key,
	value,
	keyAlias = 'key',
	valueAlias = 'value'
) => {
	if (!value) {
		return `${keyAlias}: ${key}`;
	} else if (!key) {
		return `${valueAlias}: ${value}`;
	} else if (!key && !value) {
		return '/';
	} else if (key && value) {
		return `${keyAlias}: ${key} / ${valueAlias}: ${value}`;
	}
};
