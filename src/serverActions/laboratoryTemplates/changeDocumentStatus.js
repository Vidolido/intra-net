'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import LaboratoryTemplate from '@/db/models/LaboratoryTemplate';

// I NEED TO HANDLE ERRORS HERE
export async function changeDocumentStatus(documentStatus, _id) {
	try {
		await dbConnect();
		let updatet = await LaboratoryTemplate.updateOne(
			{ _id },
			{ documentStatus }
		);
		console.log(updatet, 'updated');
		revalidatePath('/dashboard/laboratory/templates/create', 'page');
		revalidatePath('/dashboard/laboratory/templates/draft', 'page');
		return { message: 'updated' };
	} catch (error) {
		console.log('Failed to create draft Template error:', error);
		throw Error('Could not add draft Template to database: ' + error);
	}
}
