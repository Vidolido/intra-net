export const addSettings = (mainParam, mainParamName, collectionInput) => {
	// console.log(mainParam, mainParamName, 'addSettngs in utils');
	let main = Array.from(mainParam).reduce(
		(acc, currentValue) => {
			let nameArray = currentValue.name.split('-');
			let value = currentValue.value;
			acc = {
				[nameArray[1]]: {
					name: mainParamName,
					value: {
						...acc[nameArray[1]]?.value,
						[nameArray[nameArray.length - 1]]: value,
					},
				},
				collections: [
					{ name: { en: 'Metods' }, collection: ['en iso 2434', 'iso 23242'] },
					{ name: { en: 'Units' }, collection: ['g/ml', 'kg/l'] },
					{ name: { en: 'Limits' }, collection: ['0.7400', '0.7550 23242'] },
				],
			};
			// console.log(acc.name[nameArray[1]], 'the acc');
			return acc;
		},
		{ name: {} }
	);
	// let collections = Array.from(collectionInput).reduce(
	// 	(acc, currentValue) => {}
	// );
	return main;
};
