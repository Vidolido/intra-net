export const orderDocumentsByProduct = (analyses, products) => {
	let ordered = products.reduce((acc, currentValue) => {
		let document = analyses.filter(
			(analysis) =>
				analysis.header.product === currentValue.id ||
				analysis.header.product === currentValue._id
		);
		currentValue.items = document;
		acc.push(currentValue);
		return acc;
	}, []);
	return ordered;
};
