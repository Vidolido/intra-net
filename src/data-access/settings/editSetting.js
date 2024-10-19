'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';

// ERROR HANDLING IS MISSING
export async function editSetting(documentId, settingId, settingState) {
	console.log(documentId, settingId, 'OVIEEEEEE');
	console.log(settingState, 'settingState');
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

		let updatedSettings = foundDocument.settings.map((setting) => {
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
			// { settings: updatedSettings }
			{
				$set: { settings: updatedSettings },
			}
		);
		console.log(updated);
		const pathsToRevalidate = [
			`/dashboard/settings/edit/[_id]`,
			`/dashboard/settings/draft/[_id]`,
			'/dashboard/settings/create',
		];

		pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));

		// return JSON.stringify({ message: 'Update successfull' });
		return {
			success: 'Setting successfully added.',
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
		// console.log('Failed to update setting. Error:', error);
		// throw Error('Could not update setting in database: ' + error);
	}
}
