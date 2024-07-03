export const orderBySector = (items) => {
	const sectors = new Set();
	const result = [];
	items.forEach((item) => {
		sectors.add(item.sector);
	});
	sectors.forEach((sector) => {
		const filteredItems = items.filter((item) => item.sector === sector);
		result.push({ sector, items: filteredItems });
	});
	return result;
};
