// export const isObjectEmpty = (obj) => Object.keys(obj) === 0;
// export const isObjectEmpty = (obj) => Array.from(obj).length === 0;

export const isObjectEmpty = (value) => {
	if (typeof value === 'object') {
		// Check for empty objects
		return Object.keys(value).length === 0;
	}
};

export const createRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const mutateFields = (fields) => {
	// const mutatedFields = { ...fields };
	let mutFields = fields.reduce((acc, currenValue) => {
		let checked = currenValue.collections.find(
			(collection) => collection.name['en'] === 'checked'
		);
		let type = currenValue.collections.find(
			(collection) => collection.name['en'] === 'type'
		);
		return (acc = [
			...acc,
			{
				_id: currenValue._id,
				name: { ...currenValue.parameter.inputValue },
				checked: checked.items[0].value,
				type: type.items[0].value,
			},
		]);
	}, []);
	return mutFields;
};
