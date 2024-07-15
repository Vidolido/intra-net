'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Analysis from '@/db/models/Analysis';
// import LaboratoryTemplate from '@/db/models/LaboratoryTemplate';

// I NEED TO HANDLE ERRORS HERE
export async function saveTemplateId(templateId, header, documentId) {
	//   console.log(header, 'the header');
	try {
		await dbConnect();
		await Analysis.updateOne(
			{ _id: documentId },
			{
				$set: { header, templateId },
			}
		);
		revalidatePath('/dashboard/laboratory/analyses', 'page');
		revalidatePath('/dashboard/laboratory/analyses/create', 'page');
		revalidatePath('/dashboard/laboratory/analyses/draft/[_id]', 'page');
		revalidatePath('/dashboard/laboratory/analyses/edit/[_id]', 'page');
		return { message: 'createDocument RAN' };
	} catch (error) {
		console.log('Failed to create draft Template error:', error);
		throw Error('Could not add draft Template to database: ' + error);
	}
}
