'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Document from '@/db/models/Document';

// I NEED TO HANDLE ERRORS HERE
export async function saveTemplateId(templateId, header, documentId) {
	try {
		await dbConnect();
		await Document.updateOne(
			{ _id: documentId },
			{
				$set: { header, templateId },
			}
		);

		const pathsToRevalidate = [
			'/dashboard/laboratory/documents/draft/[_id]',
			'/dashboard/laboratory/documents/edit/[_id]',
			'/dashboard/laboratory/documents/create',
		];
		// const pathsToRevalidate = [
		// 	`/dashboard/laboratory/documents/draft/${documentId}`,
		// 	`/dashboard/laboratory/documents/edit/${documentId}`,
		// 	`/dashboard/laboratory/documents/create`,
		// ];

		pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));

		return { message: 'save successful' };
	} catch (error) {
		console.log('Failed to save template id. Error:', error);
		throw Error('Could not save template id to document: ' + error);
	}
}
