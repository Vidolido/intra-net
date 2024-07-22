'use server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';

export async function addCollections(collection, document) {
	const { _id } = document;
	try {
		cookies();
		await dbConnect();
		const foundDocument = await Setting.findOne({ _id });
		let optionsSchema = foundDocument.optionsSchema || {
			parameter: {},
			collections: [],
		};
		let collections = foundDocument.collections || [];

		optionsSchema.collections.push(collection);

		collections.push(collection);
		const updatedDocument = await Setting.updateOne(
			{ _id },
			{ $set: { optionsSchema } }
		)
			.lean()
			.exec();

		revalidatePath('/dashboard/settings/add', 'page');
		if (updatedDocument.modifiedCount === 1) {
			return {
				status: 200,
				error: {
					addCollections: '',
				},
				data: null,
			};
		}
	} catch (error) {
		console.log('Failed to add collection to database:', error);
		return {
			status: 500,
			error: {
				addCollections: 'Failed to add collection to database.',
				message: error.message,
			},
		};
	}
}
