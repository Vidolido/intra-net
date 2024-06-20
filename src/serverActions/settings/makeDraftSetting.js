'use server';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';
import { revalidatePath } from 'next/cache';

export async function makeDraftSetting() {
	try {
		await dbConnect();
		const draft = await Setting.create({ documentStatus: 'draft' });
		revalidatePath('/dashboard/settings', 'page');
		return JSON.stringify(draft);
	} catch (error) {
		console.log('Failed to create draft setting error:', error);
		throw Error('Could not add draft setting to database: ' + error);
	}
}
