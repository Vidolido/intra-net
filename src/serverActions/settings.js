'use server';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';
import { revalidatePath } from 'next/cache';

// export async function makeDraftSetting() {
//   console.log('IT DID RUN');
//   try {
//     await dbConnect();
//     const res = await Setting.create({ documentStatus: 'draft' });
//     revalidatePath('/dashboard/settings', 'page');
//     console.log(res, 'THE RES');
//     return JSON.stringify(res);
//   } catch (error) {
//     console.log('addNewVehicle error:', error);
//     throw Error('Could not add vehicle to database: ' + error);
//   }
//   // try {
//   // 	await Vehicle.create(payload);
//   // } catch (error) {
//   // 	console.log('addNewVehicle error:', error);
//   // 	throw Error('Could not add vehicle to database: ' + error);
//   // }
// }

export async function createSetting(formData) {
  const payload = formData.payload;
  console.log(payload, 'THE FORM DATA IN CREATE SETTING');
}
