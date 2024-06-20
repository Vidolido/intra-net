export const nameArray = (obj) => {
	const nameObject = Object.entries(obj).reduce((acc, [key, value]) => {
		return {
			...acc,
			[key]: value,
		};
	}, {});

	return { name: nameObject };
};
