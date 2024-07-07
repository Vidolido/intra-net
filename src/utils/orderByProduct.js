export const orderByProduct = (templates, products) => {
	let ordered = products.reduce((acc, currentValue) => {
		let template = templates.filter(
			(template) => template.product === currentValue.id
		);
		currentValue.items = template;
		acc.push(currentValue);
		return acc;
	}, []);
	return ordered;
};
