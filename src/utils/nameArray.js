// export const nameArray = (obj) => {
// 	return Object.entries(obj).reduce((acc, [key, value]) => {

//     acc = [
// 			...acc,
// 			{
// 				// ...acc.name,
// 				name: {
// 					...acc.name,
// 					[key]: value,
// 				},
// 			},
// 		];
// 		return acc;
// 	}, []);
// };
export const nameArray = (obj) => {
	const nameObject = Object.entries(obj).reduce((acc, [key, value]) => {
		return {
			...acc,
			[key]: value,
		};
	}, {});

	return { name: nameObject };
	// return [{ name: nameObject }];
};
// export const nameArray = (obj) => {
//   return Object.entries(obj).map(([key, value]) => ({ [key]: value }));
// };
