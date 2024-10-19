'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';

// I NEED TO HANDLE ERRORS HERE
export async function getTemplateSettings() {
	try {
		await dbConnect();
		let templateSettings = await Setting.find({
			documentStatus: 'published',
			isDeleted: false,
		}).lean();

		return {
			// templateSettings: JSON.parse(JSON.stringify(templateSettings)),
			templateSettings,
		};
	} catch (error) {
		console.log('Failed to create draft Template error:', error);
		throw Error('Could not add draft Template to database: ' + error);
	}
}
