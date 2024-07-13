'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Analysis from '@/db/models/Analysis';
// import LaboratoryTemplate from '@/db/models/LaboratoryTemplate';

// I NEED TO HANDLE ERRORS HERE
export async function saveTemplateId(templateId, documentId) {
	try {
		await dbConnect();
		// await LaboratoryTemplate.updateOne({ _id }, { ...payload });
		const analysis = await Analysis.updateOne(
			{ _id: documentId },
			{
				$set: { templateId },
			}
		);
		revalidatePath('/dashboard/laboratory/templates/create', 'page');
		revalidatePath('/dashboard/laboratory/templates/draft/[_id]', 'page');
		revalidatePath('/dashboard/laboratory/templates/edit/[_id]', 'page');
		return { message: 'createDocument RAN' };
	} catch (error) {
		console.log('Failed to create draft Template error:', error);
		throw Error('Could not add draft Template to database: ' + error);
	}
}
