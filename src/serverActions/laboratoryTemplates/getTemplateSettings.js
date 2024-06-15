'use server';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';
import { revalidatePath } from 'next/cache';

// I NEED TO HANDLE ERRORS HERE
export async function getTemplateSettings() {
	try {
		await dbConnect();
		// await LaboratoryTemplate.create({ documentStatus: 'draft' });
		let templateSettings = await Setting.find({ sector: 'I.T.' });

		// console.log(templateSettings, 'the templateSettings');
		return {
			templateSettings,
		};
	} catch (error) {
		console.log('Failed to create draft Template error:', error);
		throw Error('Could not add draft Template to database: ' + error);
	}
}
