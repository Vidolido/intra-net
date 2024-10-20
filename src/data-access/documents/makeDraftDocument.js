'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Document from '@/db/models/Document';

export async function makeDraftDocument() {
	try {
		await dbConnect();
		const draft = await Document.create({ documentStatus: 'draft' });
		const plainDraft = draft.toObject({
			versionKey: false,
		});
		plainDraft._id = plainDraft._id.toString();

		const pathsToRevalidate = [
			'/dashboard/laboratory/document/draft/[_id]',
			'/dashboard/laboratory/document/edit/[_id]',
			'/dashboard/laboratory/document/create',
			'/dashboard/laboratory/document',
		];

		pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));

		return {
			draft: plainDraft,
		};
	} catch (error) {
		console.log('Failed to create draft document error:', error);
		throw Error('Could not add draft document to database: ' + error);
	}
}
