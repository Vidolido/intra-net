export const findSettingType = (settings, targetValues) => {
	function recursiveSearch(collections) {
		return collections.some((collection) => {
			const hasTargetValue =
				collection.items &&
				collection.items.some((item) => targetValues.includes(item.value));
			if (hasTargetValue) return true;
			if (collection.collections)
				return recursiveSearch(collection.collections);
			return false;
		});
	}

	return settings.filter(
		(setting) => setting.collections && recursiveSearch(setting.collections)
	);
};
