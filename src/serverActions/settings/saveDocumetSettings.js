'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';

export async function saveDocumentSettings(docId, formData) {
	let payload = {
		sector: formData.get('sector'),
		settingName: formData.get('settingName'),
		documentStatus: formData.get('documentStatus'),
	};

	try {
		await dbConnect();
		await Setting.updateOne({ _id: docId }, { ...payload });
		revalidatePath('/dashboard/settings', 'page');
	} catch (error) {
		console.log('Failed to create draft setting error:', error);
		throw Error('Could not add draft setting to database: ' + error);
	}
}
