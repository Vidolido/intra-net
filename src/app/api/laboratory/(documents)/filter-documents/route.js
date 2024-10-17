'use server';
import { NextResponse } from 'next/server';

// connection/models/db functions
import dbConnect from '@/db/conn';
import Setting from '../../../../../../oldFiles/SettingOld';
import { mutateTemplateSettings } from '@/utils/mutateTempalteSettings';

export async function filterDocuments() {
	try {
		await dbConnect();
		const templateSettings = await Setting.find({
			documentStatus: 'published',
			isDeleted: false,
		}).lean();

		let { products, types, countries } =
			mutateTemplateSettings(templateSettings);

		console.log(products, 'OVIE SETINZI');
	} catch (error) {
		console.log('Failed to find documents in database. error:', error);
		throw Error('Could not find documents in database: ' + error);
	}
}
