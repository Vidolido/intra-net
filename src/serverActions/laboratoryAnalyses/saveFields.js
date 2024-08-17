'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Analysis from '@/db/models/Analysis';

// I NEED TO HANDLE ERRORS HERE
export async function saveFields(fields, documentId) {
	try {
		await dbConnect();

		await Analysis.updateOne(
			{ _id: documentId },
			{
				$set: { fields: fields },
			}
		);

		const pathsToRevalidate = [
			'/dashboard/laboratory/analyses/edit/[_id]',
			'/dashboard/laboratory/analyses/draft/[_id]',
			'/dashboard/laboratory/analyses/create',
		];

		pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));
		// revalidatePath('/dashboard/laboratory/analyses', 'page');
		// revalidatePath('/dashboard/laboratory/analyses/create', 'page');
		// revalidatePath('/dashboard/laboratory/analyses/draft/[_id]', 'page');
		// revalidatePath('/dashboard/laboratory/analyses/edit/[_id]', 'page');
		return { message: 'Update successful' }; //
	} catch (error) {
		console.log('Failed to create field, error:', error);
		throw Error('Could not add field to database: ' + error);
	}
}
