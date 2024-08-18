'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import LaboratoryTemplate from '@/db/models/LaboratoryTemplate';

// I NEED TO HANDLE ERRORS HERE
export async function saveBasicData(_id, formData) {
	const payload = {
		product: formData.get('product'),
		sampleType: formData.get('sampleType'),
		origin: formData.get('origin'),
		documentType: formData.get('documentType'),
		documentStatus: formData.get('documentStatus'),
	};
	// let shouldRedirect = false;
	try {
		await dbConnect();
		let updated = await LaboratoryTemplate.updateOne({ _id }, { ...payload });
		// shouldRedirect = updated.modifiedCount === 1 ? true : false;
	} catch (error) {
		console.log('Failed to create draft Template error:', error);
		throw Error('Could not add draft Template to database: ' + error);
	}

	const pathsToRevalidate = [
		'/dashboard/laboratory/templates/draft/[_id]',
		'/dashboard/laboratory/templates/edit/[_id]',
		'/dashboard/laboratory/templates/create',
	];

	pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));

	// if (shouldRedirect && payload.documentStatus === 'published') {
	if (payload.documentStatus === 'published') {
		redirect(`/dashboard/laboratory/templates/edit/${_id}`);
	} else {
		redirect(`/dashboard/laboratory/templates/draft/${_id}`);
	}
}
