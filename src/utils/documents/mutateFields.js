export const mutateFields = (fields) => {
	return fields.reduce((acc, currenValue) => {
		let type = currenValue.collections.find(
			(collection) => collection.name['en'] === 'type'
		);
		let documentType = currenValue.collections.find(
			(collection) => collection.name['en'] === 'link'
		);
		let checkedValue =
			currenValue.collections.find(
				(collection) => collection.name['en'] === 'checked'
			).items[0].value === 'true';

		let orderValue = currenValue.collections.find(
			(collection) => collection.name['en'] === 'order'
		).items[0].value;

		orderValue = !isNaN(Number(orderValue)) ? Number(orderValue) : 0;

		return (acc = [
			...acc,
			{
				_id: currenValue._id,
				name: { ...currenValue.parameter.inputValue },
				checked: checkedValue,
				order: orderValue,
				inputType: !type.items[0] ? '' : type.items[0].value,
				value: currenValue.value != undefined ? currenValue.value : '',
				links: [
					...documentType.items.map((type) => type?.value?.value || type.value),
				],
			},
		]);
	}, []);
};

export const sortFieldsByOrder = (fields) => {
	return fields.sort((a, b) => a.order - b.order);
};

export const filterByLinkedSetting = (fields, linkedSettings) => {
	return fields.filter((field) =>
		linkedSettings.some((link) => field.links.includes(link))
	);
};
