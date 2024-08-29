'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Analysis from '@/db/models/Analysis';
// import LaboratoryTemplate from '@/db/models/LaboratoryTemplate';

// I NEED TO HANDLE ERRORS HERE
export async function saveIdentificationNumbers(
	identificationNumbers,
	documentId
) {
	try {
		await dbConnect();
		await Analysis.updateOne(
			{ _id: documentId },
			{
				$set: { identificationNumbers },
			}
		);

		const pathsToRevalidate = [
			'/dashboard/laboratory/analyses/draft/[_id]',
			'/dashboard/laboratory/analyses/edit/[_id]',
			'/dashboard/laboratory/analyses/create',
		];

		pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));

		return { message: 'saveIdentificationNumber RAN' };
	} catch (error) {
		console.log('Failed to save identification numbers. Error:', error);
		throw Error('Could not save identification numbers to database: ' + error);
	}
}