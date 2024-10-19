'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';

export async function makeDraftSetting() {
	try {
		await dbConnect();
		const draft = await Setting.create({ documentStatus: 'draft' });

		if (!draft) {
			return {
				success: null,
				error: {
					document: 'Failed to create draft setting.',
				},
			};
		}

		const pathsToRevalidate = [
			'/dashboard/settings/draft/[_id]',
			'/dashboard/settings/edit/[_id]',
			'/dashboard/settings/create',
			'/dashboard/settings',
		];

		pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));

		return {
			error: null,
			success: {
				_id: draft._id.toString(),
				message: 'Successfuly created draft template.',
			},
		};
	} catch (error) {
		console.log('Could not add draft setting to database:', error);
		return {
			success: null,
			error: {
				catch: error.message,
			},
		};
		throw Error(': ' + error);
	}
}
