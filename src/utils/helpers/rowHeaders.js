export const getRowHeaders = (setting, type) => ({
	parameter: setting?.parameter?.name[type],
	collections: setting?.collections?.map((setting) => setting.name),
});
