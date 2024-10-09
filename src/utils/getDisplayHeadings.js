export const getDisplayHeadings = (setting, type) => ({
  // main: setting?.parameter?.name?.singular,
  main: setting?.parameter?.name[type],
  collections: setting?.collections?.map((setting) => setting.name),
});
