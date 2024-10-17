'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';

// ERROR HANDLING IS MISSING
export async function editSetting(documentId, settingId, settingState) {
	try {
		await dbConnect();
		const settingDocument = await Setting.findOne({ _id: documentId });

		if (!settingDocument) {
			throw new Error('Document not found');
		}

		let updatedSettings = settingDocument.settings.map((setting) => {
			if (setting._id.toString() === settingId.toString()) {
				return {
					_id: setting._id,
					...settingState,
				};
			}
			return setting;
		});

		let updated = await Setting.updateOne(
			{ _id: documentId },
			{ settings: updatedSettings }
		);

		const pathsToRevalidate = [
			'/dashboard/laboratory/document/draft/[_id]',
			'/dashboard/laboratory/document/edit/[_id]',
			'/dashboard/laboratory/document/create',
			'/dashboard/laboratory/document',
		];

		pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));

		return JSON.stringify({ message: 'Update successfull' });
	} catch (error) {
		console.log('Failed to update setting. Error:', error);
		throw Error('Could not update setting in database: ' + error);
	}
}
