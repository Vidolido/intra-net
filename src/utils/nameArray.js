// export const nameArray = (obj) => {
// 	return Object.entries(obj).reduce(
// 		(acc, [key, value]) => {
// 			acc = {
// 				name: {
// 					...acc.name,
// 					[key]: value,
// 				},
// 			};
// 			return acc;
// 		},
// 		{ name: {} }
// 	);
// };
export const nameArray = (obj) => {
  return Object.entries(obj).map(([key, value]) => ({ [key]: value }));
};
