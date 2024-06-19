export const filterTemplates = (templates, searchOptions) => {
	return templates.filter((template) => {
		return Object.keys(searchOptions).every(
			(key) => template[key] === searchOptions[key]
		);
	});
};
