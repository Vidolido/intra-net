'use server';
import { revalidatePath } from 'next/cache';

// moddels/db functions
import dbConnect from '@/db/conn';
import Analysis from '@/db/models/Analysis';

// Да исхендлаам ерори
export async function deleteAnalysisDocument(_id, documentStatus) {
	try {
		await dbConnect();
		let deleted;
		if (documentStatus === 'draft') {
			deleted = await Analysis.deleteOne({ _id });
		}
		if (documentStatus === 'published') {
			deleted = await Analysis.updateOne(
				{ _id },
				{ $set: { isDeleted: true } }
			);
		}
		revalidatePath('/dashboard/laboratory/analyses', 'page');
		// return JSON.stringify(draft);

		// just for test, delete later
		return { message: deleted };
	} catch (error) {
		console.log('Failed to create draft setting error:', error);
		throw Error('Could not add draft setting to database: ' + error);
	}
}
