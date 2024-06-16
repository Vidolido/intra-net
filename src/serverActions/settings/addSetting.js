'use server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// moddels/db functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';

export async function addSetting(settingToAdd, document) {
	const { _id } = document;
	try {
		cookies();
		await dbConnect();
		const foundDocument = await Setting.findOne({ _id });
		let settings = foundDocument.settings || [];
		settings.push(settingToAdd);

		const updatedDocument = await Setting.updateOne(
			{ _id },
			{ $set: { settings } }
		)
			.lean()
			.exec();
		revalidatePath('/dashboard/settings/add', 'page');
		// Да вратам еррор доколку се случи.
		// return;
		return JSON.stringify(updatedDocument);
	} catch (error) {
		console.log('Failed to create draft setting error:', error);
		throw Error('Could not add draft setting to database: ' + error);
	}
}
