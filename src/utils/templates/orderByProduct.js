export const orderByProduct = (templates, products) => {
	let ordered = products.reduce((acc, currentValue) => {
		let template = templates.filter(
			(template) => template?.header?.product === currentValue._id.toString()
		);
		currentValue.items = template;
		acc.push(currentValue);
		return acc;
	}, []);
	return ordered;
};
