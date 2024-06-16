'use server';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import LaboratoryTemplate from '@/db/models/LaboratoryTemplate';
// import Setting from '@/db/models/Setting';
import { revalidatePath } from 'next/cache';

// Да исхендлаам ерори
export async function deleteTemplateRow(row, document) {
	//   console.log('IT DID RUN');
	try {
		await dbConnect();
		let foundDocument = await LaboratoryTemplate.findOne({ _id: document });
		let template = foundDocument.template;
		console.log(template.length, 'template length');
		if (!template || !template.length) {
			console.log('no template');
			return;
		}

		let mutTempalte = template.filter((item) => item._id.toString() !== row);
		// console.log(mutTempalte.length, 'mutTempalte length');
		await LaboratoryTemplate.updateOne(
			{ _id: document },
			{ template: mutTempalte }
		);
		// console.log(mutTempalte, 'the mut');

		revalidatePath('/dashboard/laboratory/templates/create', 'page');
		// return JSON.stringify(draft);
	} catch (error) {
		console.log('Failed to create draft setting error:', error);
		throw Error('Could not add draft setting to database: ' + error);
	}
}
