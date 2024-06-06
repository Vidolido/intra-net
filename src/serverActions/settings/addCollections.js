'use server';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function addCollections(collection, document) {
	// console.log(collection, 'THE COLLECTION');
	// console.log(document, '~IT DID RUN');
	const { _id } = document;
	try {
		cookies();
		await dbConnect();
		const foundDocument = await Setting.findOne({ _id });
		let collections = foundDocument.collections || [];

		// console.log(collections);

		collections.push(collection);
		const updatedDocument = await Setting.updateOne(
			{ _id },
			{ $set: { collections } }
		)
			.lean()
			.exec();
		// console.log(updatedDocument, 'the document');
		revalidatePath('/dashboard/settings/add', 'page');
		// Да вратам еррор доколку се случи.
		return;
		return JSON.stringify(updatedDocument);
	} catch (error) {
		console.log('Failed to create draft setting error:', error);
		throw Error('Could not add draft setting to database: ' + error);
	}
}
