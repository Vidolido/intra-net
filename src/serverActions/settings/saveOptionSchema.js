'use server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';

// export async function saveOptionSchema(docId, formData) {
export async function saveOptionSchema(formData) {
  console.log(formData, 'FORMDATATA');
  cookies();
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
    // await Setting.updateOne({ _id: docId }, { optionsSchema: payload });
    // revalidatePath('/dashboard/settings/edit/[_id]', 'page');
    // revalidatePath('/dashboard/settings/draft/[_id]', 'page');
    // revalidatePath('/dashboard/settings/add', 'page');
  } catch (error) {
    console.log('Failed to create draft setting error:', error);
    throw Error('Could not add draft setting to database: ' + error);
  }
}
