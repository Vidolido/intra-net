'use server';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import LaboratoryTemplate from '@/db/models/LaboratoryTemplate';
import { revalidatePath } from 'next/cache';

// I NEED TO HANDLE ERRORS HERE
export async function makeDraftTemplate() {
	try {
		await dbConnect();
		await LaboratoryTemplate.create({ documentStatus: 'draft' });

		revalidatePath('/dashboard/settings', 'page');
	} catch (error) {
		console.log('Failed to create draft Template error:', error);
		throw Error('Could not add draft Template to database: ' + error);
	}
}
