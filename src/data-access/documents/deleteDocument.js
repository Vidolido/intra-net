'use server';
import { revalidatePath } from 'next/cache';

// moddels/db functions
import dbConnect from '@/db/conn';
import Document from '@/db/models/Document';

// Да исхендлаам ерори
export async function deleteDocument(_id, documentStatus) {
	try {
		await dbConnect();
		let deleted;
		if (documentStatus === 'draft') {
			deleted = await Document.deleteOne({ _id });
		}
		if (documentStatus === 'published') {
			deleted = await Document.updateOne(
				{ _id },
				{ $set: { isDeleted: true } }
			);
		}
		revalidatePath('/dashboard/laboratory/documents', 'page');
		// return JSON.stringify(draft);

		// just for test, delete later
		return { message: deleted };
	} catch (error) {
		console.log('Failed to delete document error:', error);
		throw Error('Could not delete document to database: ' + error);
	}
}
