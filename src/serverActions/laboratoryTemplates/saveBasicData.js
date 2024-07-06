'use server';
import { revalidatePath } from 'next/cache';

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
	try {
		await dbConnect();
		await LaboratoryTemplate.updateOne({ _id }, { ...payload });
		revalidatePath('/dashboard/laboratory/templates/create', 'page');
		revalidatePath('/dashboard/laboratory/templates/draft/[_id]', 'page');
		revalidatePath('/dashboard/laboratory/templates/edit/[_id]', 'page');
	} catch (error) {
		console.log('Failed to create draft Template error:', error);
		throw Error('Could not add draft Template to database: ' + error);
	}
}
