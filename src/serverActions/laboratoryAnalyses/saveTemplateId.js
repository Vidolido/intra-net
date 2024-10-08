'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Analysis from '@/db/models/Analysis';
// import LaboratoryTemplate from '@/db/models/LaboratoryTemplate';

// I NEED TO HANDLE ERRORS HERE
export async function saveTemplateId(templateId, header, documentId) {
	try {
		await dbConnect();
		await Analysis.updateOne(
			{ _id: documentId },
			{
				$set: { header, templateId },
			}
		);

		const pathsToRevalidate = [
			'/dashboard/laboratory/analyses/draft/[_id]',
			'/dashboard/laboratory/analyses/edit/[_id]',
			'/dashboard/laboratory/analyses/create',
		];

		pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));

		return { message: 'createDocument RAN' };
	} catch (error) {
		console.log('Failed to create draft Template error:', error);
		throw Error('Could not add draft Template to database: ' + error);
	}
}
