'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';

// Да исхендлаам ерори
export async function deleteDraftSetting(_id) {
	try {
		await dbConnect();
		// await Setting.deleteOne({ _id });
		await Setting.updateOne({ _id }, { isDeleted: true });
		revalidatePath('/dashboard/settings', 'page');
	} catch (error) {
		console.log('Failed to create draft setting error:', error);
		throw Error('Could not add draft setting to database: ' + error);
	}
}
