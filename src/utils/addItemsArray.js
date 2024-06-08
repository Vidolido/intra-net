export const addItemsArray = (optionsSchema) => {
	let mutOptionsSchema = { ...optionsSchema };

	mutOptionsSchema.parameter = {
		...mutOptionsSchema.parameter,
		inputValue: [],
	};

	mutOptionsSchema.collections = mutOptionsSchema.collections.map(
		(collection) => {
			let nameArray = Object.entries(collection.name);
			let mutName = nameArray.reduce((acc, currentValue) => {
				let [name, value] = currentValue;
				let splitName = name.split('-');
				let newName = splitName[splitName.length - 1];
				acc[newName] = value;
				return acc;
			}, {});
			return { name: mutName, items: [] };
		}
	);

	return mutOptionsSchema;
};
