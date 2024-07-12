'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Analysis from '@/db/models/Analysis';

// I NEED TO HANDLE ERRORS HERE
export async function saveFields(fields, documentId) {
	try {
		await dbConnect();

		const analysis = await Analysis.updateOne(
			{ _id: documentId },
			{
				$set: { fields: fields },
			}
		);
		// console.log(analysis, 'update analysis fields');
		revalidatePath('/dashboard/laboratory/analyses/create', 'page');
		revalidatePath('/dashboard/laboratory/analyses/draft/[_id]', 'page');
		revalidatePath('/dashboard/laboratory/analyses/edit/[_id]', 'page');
		return { message: 'Update successful' }; //
	} catch (error) {
		console.log('Failed to create draft Template error:', error);
		throw Error('Could not add draft Template to database: ' + error);
	}
}
