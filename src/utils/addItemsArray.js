export const addItemsArray = (optionsSchema) => {
	let mutOptionsSchema = { ...optionsSchema };

	// mutOptionsSchema.parameter.name.singular = {
	// 	name: mutOptionsSchema.parameter.name.singular,
	// 	inputValue: {},
	// };
	// mutOptionsSchema.parameter.name.plural = {
	// 	name: mutOptionsSchema.parameter.name.plural,
	// 	inputValue: {},
	// };

	mutOptionsSchema.parameter = {
		...mutOptionsSchema.parameter,
		inputValue: [],
	};

	mutOptionsSchema.collections = mutOptionsSchema.collections.map(
		(collection) => ({
			name: collection.name,
			items: [],
		})
	);
	return mutOptionsSchema;
};
