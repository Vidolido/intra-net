'use server';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';
import { revalidatePath } from 'next/cache';

// Да исхендлаам ерори
export async function deleteSetting({ setting, document }) {
	console.log('IT DID RUN', setting, document);
	try {
		let foundDocument = await Setting.findOne({ _id: document });
		// console.log(foundDocument);
		let filteredSettings = foundDocument.settings.filter(
			(item) => item._id.toString() !== setting
		);
		await Setting.updateOne({ _id: document }, { settings: filteredSettings });
		console.log(filteredSettings);
		revalidatePath('/dashboard/settings/add', 'page');
	} catch (error) {
		console.log('Failed to create draft setting error:', error);
		throw Error('Could not add draft setting to database: ' + error);
	}
	return {
		error: null,
	};
	//   try {
	//     await dbConnect();
	//     await Setting.deleteOne({ _id });
	//     revalidatePath('/dashboard/settings', 'page');
	//     // return JSON.stringify(draft);
	//   } catch (error) {
	//     console.log('Failed to create draft setting error:', error);
	//     throw Error('Could not add draft setting to database: ' + error);
	//   }
}
