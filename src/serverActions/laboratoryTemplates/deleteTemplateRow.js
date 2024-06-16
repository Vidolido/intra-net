'use server';
import { revalidatePath } from 'next/cache';

// moddels/db functions
import dbConnect from '@/db/conn';
import LaboratoryTemplate from '@/db/models/LaboratoryTemplate';

// Да исхендлаам ерори
export async function deleteTemplateRow(row, document) {
	try {
		await dbConnect();
		let foundDocument = await LaboratoryTemplate.findOne({ _id: document });
		let template = foundDocument.template;

		if (!template || !template.length) {
			console.log('no template');
			return;
		}

		let mutTempalte = template.filter((item) => item._id.toString() !== row);
		await LaboratoryTemplate.updateOne(
			{ _id: document },
			{ template: mutTempalte }
		);

		revalidatePath('/dashboard/laboratory/templates/create', 'page');
		// return JSON.stringify(draft);
	} catch (error) {
		console.log('Failed to create draft setting error:', error);
		throw Error('Could not add draft setting to database: ' + error);
	}
}
