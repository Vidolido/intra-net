export const getDisplayHeadings = (setting) => ({
  main: setting?.parameter?.name?.singular,
  collections: setting?.collections?.map((setting) => setting.name),
});
