'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Analysis from '@/db/models/Analysis';
// import LaboratoryTemplate from '@/db/models/LaboratoryTemplate';

// I NEED TO HANDLE ERRORS HERE
export async function saveFields(fields, documentId) {
	console.log(fields, 'FIELDS!');
	try {
		await dbConnect();
		// const analysis = await Analysis.findOne({ _id: documentId });
		const analysis = await Analysis.updateOne(
			{ _id: documentId },
			{
				$set: { fields: fields },
			}
		);
		console.log(analysis, 'update analysis fields');
		revalidatePath('/dashboard/laboratory/analyses/create', 'page');
		revalidatePath('/dashboard/laboratory/analyses/draft/[_id]', 'page');
		revalidatePath('/dashboard/laboratory/analyses/edit/[_id]', 'page');
		return { message: 'createDocument RAN' };
	} catch (error) {
		console.log('Failed to create draft Template error:', error);
		throw Error('Could not add draft Template to database: ' + error);
	}
}
