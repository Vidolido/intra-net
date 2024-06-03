'use server';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function deleteCollections(index, document) {
	const { _id } = document;
	try {
		cookies();
		await dbConnect();
		const foundDocument = await Setting.findOne({ _id });
		let collections = foundDocument.collections || [];

		console.log(collections);

		collections = collections.filter((_, i) => i !== index);
		const updatedDocument = await Setting.updateOne(
			{ _id },
			{ $set: { collections } }
		)
			.lean()
			.exec();
		// console.log(foundDocument, 'the document');
		revalidatePath('/dashboard/settings/add', 'page');
		// Да вратам еррор доколку се случи.
		// return;
		return JSON.stringify(updatedDocument);
	} catch (error) {
		console.log('Failed to create draft setting error:', error);
		throw Error('Could not add draft setting to database: ' + error);
	}
}
