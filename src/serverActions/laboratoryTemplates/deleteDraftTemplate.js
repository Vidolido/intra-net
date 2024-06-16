'use server';
import { revalidatePath } from 'next/cache';

// moddels/db functions
import dbConnect from '@/db/conn';
import LaboratoryTemplate from '@/db/models/LaboratoryTemplate';

// Да исхендлаам ерори
export async function deleteDraftTemplate(_id) {
	try {
		await dbConnect();
		await LaboratoryTemplate.deleteOne({ _id });
		revalidatePath('/dashboard/laboratory/templates', 'page');
		// return JSON.stringify(draft);
	} catch (error) {
		console.log('Failed to create draft setting error:', error);
		throw Error('Could not add draft setting to database: ' + error);
	}
}
