'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';

export async function makeDraftSetting() {
	try {
		await dbConnect();
		const draft = await Setting.create({ documentStatus: 'draft' });
		// revalidatePath('/dashboard/settings', 'page');

		const pathsToRevalidate = [
			'/dashboard/settings/draft/[_id]',
			'/dashboard/settings/edit/[_id]',
			'/dashboard/settings/create',
			'/dashboard/settings',
		];

		pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));

		// return JSON.stringify(draft);
		return {
			draft: draft,
		};
	} catch (error) {
		console.log('Failed to create draft setting error:', error);
		throw Error('Could not add draft setting to database: ' + error);
	}
}
