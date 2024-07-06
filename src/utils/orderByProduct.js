export const orderByProduct = (items) => {
	const products = new Set();
	const result = [];
	items.forEach((item) => {
		products.add(item.product);
	});
	products.forEach((product) => {
		const filteredItems = items.filter((item) => item.sector === product);
		result.push({ products, items: filteredItems });
	});
	return result;
};
