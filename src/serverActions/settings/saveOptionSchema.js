'use server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';

// export async function saveOptionSchema(docId, formData) {
export async function saveOptionSchema(state, formData) {
	cookies();
	console.log(formData, 'FORMDATATA');
	let _id = formData.get('document_id');

	let payload = Array.from(formData).reduce((acc, currentValue) => {
		if (currentValue[0] === 'document_id') return;

		if (currentValue[0].includes('plural')) {
			let lang = currentValue[0].split('-')[1];
			acc = {
				...acc,
				parameter: {
					...acc?.parameter,
					name: {
						...acc?.parameter?.name,
						plural: {
							...acc?.parameter?.name?.plural,
							[lang]: currentValue[1],
						},
					},
				},
			};
		}

		if (currentValue[0].includes('singular')) {
			let lang = currentValue[0].split('-')[1];
			acc = {
				...acc,
				parameter: {
					...acc?.parameter,
					name: {
						...acc?.parameter?.name,
						singular: {
							...acc?.parameter?.name?.singular,
							[lang]: currentValue[1],
						},
					},
				},
			};
		}

		if (currentValue[0].includes('collection')) {
			let collections = [];
			const nameParts = currentValue[0].match(/collection\[(\d+)\]-(\w+)/);
			console.log(nameParts, 'THE NAME PARTS');
			const collectionIndex = parseInt(nameParts[1], 10);
			const languageCode = nameParts[2];
			const value = currentValue[0].value;
			// console.log(collectionIndex);
			if (!collections[collectionIndex]) {
				collections[collectionIndex] = { name: {} };
			}
			collections[collectionIndex].name[languageCode] = value;
			if (!acc.collections) {
				acc.collections = collections;
			}
		}

		return acc;
	}, {});
	console.log(payload);
	// let main = Object.entries(Object.entries(formData)).filter((element) =>
	// 	element[0].includes('main')
	// );
	// console.log(main);
	// let main = Object.entries(Object.fromEntries(formData)).filter((element) =>
	// 	element[0].includes('main')
	// );

	// let parameter = Array.from(main).reduce((acc, currentValue) => {
	// 	let nameArray = currentValue[0].split('-');
	// 	acc = {
	// 		parameter: {
	// 			name: {
	// 				...acc?.parameter?.name,
	// 				[nameArray[1]]: {
	// 					...acc?.parameter?.name[nameArray[1]],

	// 					[nameArray[nameArray.length - 1]]: currentValue[1],
	// 				},
	// 			},
	// 			inputValue: {},
	// 		},
	// 	};
	// 	return acc;
	// }, {});

	try {
		await dbConnect();
		// let doc = await Setting.findOne({ _id: docId });
		// let optionsSchema = doc.optionsSchema;
		// let payload = {
		// 	...parameter,
		// 	collections: [...optionsSchema.collections],
		// };
		await Setting.updateOne({ _id }, { optionsSchema: payload });
		revalidatePath('/dashboard/settings/edit/[_id]', 'page');
		revalidatePath('/dashboard/settings/draft/[_id]', 'page');
		revalidatePath('/dashboard/settings/add', 'page');
	} catch (error) {
		console.log('Failed to create draft setting error:', error);
		throw Error('Could not add draft setting to database: ' + error);
	}
}
