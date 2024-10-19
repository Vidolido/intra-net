'use server';
import { revalidatePath } from 'next/cache';

// models/db functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';

export async function insertSettings(state, documentId) {
	try {
		await dbConnect();
		const foundDocument = await Setting.findOne({ _id: documentId });
		if (!foundDocument) {
			return {
				success: null,
				error: {
					document: 'There is no document with that id.',
				},
			};
		}

		let settings = foundDocument.settings || [];
		settings.push(state);

		let updated = await Setting.updateOne(
			{ _id: documentId },
			{
				$set: { settings },
			}
		);
		const pathsToRevalidate = [
			`/dashboard/settings/edit/[_id]`,
			`/dashboard/settings/draft/[_id]`,
			'/dashboard/settings/create',
		];

		pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));

		return {
			success: 'Setting successfully added.',
			error: null,
		};
	} catch (error) {
		console.log('Failed to add setting to collection:', error);
		return {
			success: null,
			error: {
				catch: error.message,
			},
		};
	}
}
