'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import LaboratoryTemplate from '@/db/models/LaboratoryTemplate';

// I NEED TO HANDLE ERRORS HERE
export async function addTemplateSetting({
	property,
	mutCollections,
	document,
}) {
	let payload = {
		parameter: property,
		items: mutCollections,
	};

	try {
		await dbConnect();
		const foundDocument = await LaboratoryTemplate.findOne({ _id: document });
		let template = foundDocument.template || [];
		template.push(payload);

		let updatedTemplate = await LaboratoryTemplate.updateOne(
			{ _id: document },
			{ $set: { template } }
		)
			.lean()
			.exec();

		revalidatePath('/dashboard/laboratory/templates/create', 'page');

		// await LaboratoryTemplate.create({ documentStatus: 'draft' });
		// let templateSettings = await Setting.find({ sector: 'I.T.' });
		// let updatedSetting = await LaboratoryTemplate.updateOne

		// console.log(templateSettings, 'the templateSettings');
		return {
			message: 'addTemplateSetting ran',
			updatedTemplate,
		};
	} catch (error) {
		console.log('Failed to create draft Template error:', error);
		throw Error('Could not add draft Template to database: ' + error);
	}
}
