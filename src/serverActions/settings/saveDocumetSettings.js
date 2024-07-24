'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';

// TODO: Handle errors
// TODO: Rename this function: saveSettingHeader
export async function saveDocumentSettings(state, formData) {
	const _id = formData.get('document_id');
	let payload = {
		sector: formData.get('sector'),
		settingName: formData.get('settingName'),
		documentStatus: formData.get('documentStatus') || 'draft',
	};

	try {
		await dbConnect();
		await Setting.updateOne({ _id }, { ...payload });

		revalidatePath('/dashboard/settings', 'page');

		return {
			message: 'Save successful.',
		};
	} catch (error) {
		return JSON.stringify({ error: error.message });
	}
}
