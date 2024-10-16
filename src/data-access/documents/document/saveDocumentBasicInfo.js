'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Document from '@/db/models/Document';

// I NEED TO HANDLE ERRORS HERE
export async function saveDocumentBasicInfo(basicInfo, documentId) {
	// console.log(basicInfo, 'the basic info fields');
	// console.log(documentId, 'document id');
	try {
		await dbConnect();

		await Document.updateOne(
			{ _id: documentId },
			{
				$set: { basicInfo: basicInfo },
			}
		);

		const pathsToRevalidate = [
			'/dashboard/laboratory/documents/edit/[_id]',
			'/dashboard/laboratory/documents/draft/[_id]',
			'/dashboard/laboratory/documents/create',
		];

		pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));

		return { message: 'Update successful' };
	} catch (error) {
		console.log('Failed to create field, error:', error);
		throw Error('Could not add field to database: ' + error);
	}
}
