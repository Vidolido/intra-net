export const mutateFields = (fields) => {
	let test = 0;
	let mutFields = fields.reduce((acc, currenValue) => {
		let checked = currenValue.collections.find(
			(collection) => collection.name['en'] === 'checked'
		);
		let type = currenValue.collections.find(
			(collection) => collection.name['en'] === 'type'
		);
		let isChecked = checked.items[0].value === 'checked' ? true : false;
		console.log(isChecked, 'isChecked');
		let order = null;
		if (isChecked) {
			order = ++test;
		}
		return (acc = [
			...acc,
			{
				_id: currenValue._id,
				order: order,
				name: { ...currenValue.parameter.inputValue },
				checked: !checked.items[0] ? '' : checked.items[0].value,
				inputType: !type.items[0] ? '' : type.items[0].value,
				value: currenValue.value != undefined ? currenValue.value : '',
			},
		]);
	}, []);
	return mutFields;
};
