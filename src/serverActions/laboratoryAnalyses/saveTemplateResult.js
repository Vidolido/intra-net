'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
// import Analysis from '@/db/models/Analysis';
import LaboratoryTemplate from '@/db/models/LaboratoryTemplate';
import Document from '@/db/models/Document';

// I NEED TO HANDLE ERRORS HERE
export async function saveTemplateResult(documentId, formData) {
	let resultFields = Array.from(formData);
	// console.log(resultFields, 'result');
	try {
		await dbConnect();
		let analysis = await Document.findOne({ _id: documentId });
		let template = await LaboratoryTemplate.findOne({
			_id: analysis.templateId,
		});
		let populateResult = resultFields.reduce(
			(acc, [id, value]) => {
				if (acc.find((e) => e._id.toString() === id)) {
					acc.find((e) => e._id.toString() === id).result = value;
				}
				return acc;
			},
			[...template.template]
		);
		await Document.updateOne(
			{ _id: documentId },
			{
				$set: { template: populateResult, documentStatus: 'published' },
			}
		);

		const pathsToRevalidate = [
			'/dashboard/laboratory/analyses/create',
			'/dashboard/laboratory/analyses/draft/[_id]',
			'/dashboard/laboratory/analyses/edit/[_id]',
			'/dashboard/laboratory/analyses/all',
			'/dashboard/laboratory/analyses',
		];

		pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));

		return { message: 'createDocument RAN' };
	} catch (error) {
		console.log('Failed to save result error:', error);
		throw Error('Could not save result to database: ' + error);
	}
}
