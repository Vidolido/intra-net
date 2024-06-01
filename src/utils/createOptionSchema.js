export const createOptionsSchema = (mainParam, options) => {
	let main = Array.from(mainParam).reduce((acc, currentValue) => {
		let nameArray = currentValue.name.split('-');
		acc = {
			parameter: {
				name: {
					...acc?.parameter?.name,
					[nameArray[1]]: {
						...acc?.parameter?.name[nameArray[1]],

						[nameArray[nameArray.length - 1]]: currentValue.value,
					},
				},
				value: {},
			},
		};
		return acc;
	}, {});
	let collections = Array.from(options).reduce(
		(acc, currentValue) => {
			let nameArray = currentValue.name.split('-');

			let collection = {
				name: {
					...acc?.collections[nameArray[0]]?.name,
					[nameArray[nameArray.length - 1]]: currentValue.value,
				},
				collection: [],
			};
			acc.collections[nameArray[0]] = collection;

			return acc;
		},
		{
			collections: [],
		}
	);
	return {
		...main,
		...collections,
	};
};
