'use server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// models/db functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';

export async function insertSetting(state, documentId) {
	console.log(state, documentId, 'the state in insertSetting.js');
	// console.log(formData, 'formData in insertSetting.js');
	try {
		await dbConnect();
		const foundDocument = await Setting.findOne({ _id: documentId });
		if (!foundDocument) {
			return {
				message: 'There is no document with that id.',
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
		// console.log(updated, 'OVOA');

		return {
			message: 'Setting successfully added.',
		};
	} catch (error) {
		console.log('Failed to add setting error:', error);
		throw Error('Could not add setting to document: ' + error);
	}
}
