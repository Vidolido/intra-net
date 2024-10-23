'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';

// ERROR HANDLING IS MISSING
export async function editSetting(documentId, settingId, settingState) {
	try {
		await dbConnect();
		const foundDocument = await Setting.findOne({ _id: documentId });

		if (!foundDocument) {
			return {
				error: {
					document: 'There is no document with that id.',
				},
			};
		}

		let updatedDocumentSettings = foundDocument.settings.map((setting) => {
			if (setting._id.toString() === settingId.toString()) {
				return {
					_id: setting._id,
					...settingState,
				};
			}
			return setting;
		});

		let upadtedSetting = updatedDocumentSettings.find(
			(setting) => setting._id.toString() === settingId.toString()
		);

		upadtedSetting = JSON.parse(JSON.stringify(upadtedSetting));

		let updated = await Setting.updateOne(
			{ _id: documentId },
			{
				$set: { settings: updatedDocumentSettings },
			}
		);
		const pathsToRevalidate = [
			`/dashboard/settings/edit/${documentId}`,
			`/dashboard/settings/draft/${documentId}`,
			'/dashboard/settings/create',
		];
		// const pathsToRevalidate = [
		// 	`/dashboard/settings/edit/[_id]`,
		// 	`/dashboard/settings/draft/[_id]`,
		// 	'/dashboard/settings/create',
		// ];

		pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));

		return {
			success: { ...upadtedSetting },
			error: null,
		};
	} catch (error) {
		console.log('Failed to update setting. Error:', error);
		return {
			success: null,
			error: {
				catch: error.message,
			},
		};
	}
}
