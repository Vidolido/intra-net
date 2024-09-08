export const orderBySector = (sectors, items) => {
	const result = [];
	sectors.forEach((sector) => {
		const filteredItems = items.filter(
			(item) => item.sector._id === sector._id
		);
		if (!filteredItems.length) return;
		result.push({ name: sector.name, items: filteredItems });
	});
	return result;
};
