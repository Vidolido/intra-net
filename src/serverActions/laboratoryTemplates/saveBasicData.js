'use server';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import LaboratoryTemplate from '@/db/models/LaboratoryTemplate';
import { revalidatePath } from 'next/cache';

// I NEED TO HANDLE ERRORS HERE
export async function saveBasicData({ headerData, document }) {
	// console.log(headerData, 'header data');
	try {
		await dbConnect();
		await LaboratoryTemplate.updateOne({ _id: document }, { ...headerData });
		revalidatePath('/dashboard/laboratory/templates/create', 'page');
	} catch (error) {
		console.log('Failed to create draft Template error:', error);
		throw Error('Could not add draft Template to database: ' + error);
	}
}
