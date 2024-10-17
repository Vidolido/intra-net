'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';

// Да исхендлаам ерори
export async function deleteSetting({ setting, document }) {
	try {
		await dbConnect();
		let foundDocument = await Setting.findOne({ _id: document });
		let filteredSettings = foundDocument.settings.filter(
			(item) => item._id.toString() !== setting
		);
		await Setting.updateOne({ _id: document }, { settings: filteredSettings });
		revalidatePath('/dashboard/settings/add', 'page');
	} catch (error) {
		console.log('Failed to create draft setting error:', error);
		throw Error('Could not add draft setting to database: ' + error);
	}
	return {
		error: null,
	};
}
