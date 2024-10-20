export const mutateForSelect = (settings) =>
	settings.map((setting) => ({
		_id: setting?._id,
		name: setting?.parameter,
	}));
