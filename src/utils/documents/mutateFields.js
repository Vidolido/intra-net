export const mutateFields = (fields) => {
	let { optionsSchema, settings } = fields;
	let collections = optionsSchema.collections.map((collection) => ({
		[collection?.name?.en]: collection?._id,
	}));

	return settings?.reduce((acc, currenValue) => {
		const merged = collections.reduce((acc, current) => {
			const key = Object.keys(current)[0];
			const id = current[key];
			acc[key] = currenValue?.collections[id] || [];
			return acc;
		}, {});
		return (acc = [
			...acc,
			{
				_id: currenValue?._id,
				name: currenValue?.parameter,
				checked: merged?.checked[0]?.value === 'true' ? true : false,
				order: !isNaN(Number(merged?.order[0]?.value))
					? Number(merged?.order[0]?.value)
					: 0,
				inputType: merged?.type[0]?.value,
				links: merged.link.map((lnk) => lnk?.value?.value || lnk?.value),
				value: currenValue?.value != undefined ? currenValue.value : '',
			},
		]);
	}, []);
};

export const sortFieldsByOrder = (fields) => {
	return fields.sort((a, b) => a.order - b.order);
};

export const filterByLinkedSetting = (fields, linkedSettings) => {
	return fields.filter((field) =>
		linkedSettings.some((link) => field?.links.includes(link))
	);
};
