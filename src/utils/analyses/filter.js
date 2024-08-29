export const filter = (documents, searchOptions) => {
	return documents.filter((template) => {
		return Object.keys(searchOptions).every(
			(key) => template[key] === searchOptions[key]
		);
	});
};
