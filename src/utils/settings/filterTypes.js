export function filterTypes(settingsArray, type) {
	return settingsArray.filter((setting) =>
		Object.values(setting.collections).every((collection) =>
			collection.every((item) => item.value === type)
		)
	);
}
