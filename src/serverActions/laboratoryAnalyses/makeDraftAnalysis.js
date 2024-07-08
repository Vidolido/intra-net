'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Analysis from '@/db/models/Analysis';
// import Setting from '@/db/models/Setting';

export async function makeDraftAnalysis() {
	try {
		await dbConnect();
		const draft = await Analysis.create({ documentStatus: 'draft' });
		revalidatePath('/dashboard/settings', 'page');
		return JSON.stringify(draft);
	} catch (error) {
		console.log('Failed to create draft setting error:', error);
		throw Error('Could not add draft setting to database: ' + error);
	}
}
