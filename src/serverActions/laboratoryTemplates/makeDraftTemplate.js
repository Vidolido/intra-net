'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import LaboratoryTemplate from '@/db/models/LaboratoryTemplate';

// I NEED TO HANDLE ERRORS HERE
export async function makeDraftTemplate() {
	try {
		await dbConnect();
		const draft = await LaboratoryTemplate.create({ documentStatus: 'draft' });

		if (!draft) {
			return {
				success: null,
				error: {
					document: 'Failed to create draft template.',
				},
			};
		}

		// revalidatePath('/dashboard/settings', 'page');

		const pathsToRevalidate = [
			'/dashboard/laboratory/templates/draft/[_id]',
			'/dashboard/laboratory/templates/edit/[_id]',
			'/dashboard/laboratory/templates/create',
			'/dashboard/laboratory/templates/',
		];

		pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));

		return {
			error: null,
			success: {
				_id: draft._id.toString(),
				message: 'Successfuly created draft template.',
			},
		};
	} catch (error) {
		console.log('Failed to create draft template error:', error);
		return {
			success: null,
			error: {
				catch: error.message,
			},
		};
	}
}
