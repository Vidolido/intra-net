'use server';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// connection/models/db functions
import dbConnect from '@/db/conn';
import Document from '@/db/models/Document';
import Setting from '@/db/models/Setting';

//create

export async function GET(request) {
	const documentType = request?.nextUrl?.searchParams.get('documentType');

	try {
		await dbConnect();
		const documents = await Document.find({
			'header.documentType': documentType,
		})
			.limit(10)
			.sort({ createdAt: -1 });

		const types = await Setting.findOne({ settingName: 'Types' });
		const fields = await Setting.findOne({ settingName: 'Fields' });
		const labNumberFieldId = fields?.settings.find(
			(setting) => setting.parameter.inputValue.en === 'Laboratory Number'
		)._id;

		let type = documentType
			? types?.settings.find((set) => set._id.toString() === documentType)
					.parameter.inputValue.en
			: undefined;

		const currentYear = new Date().getFullYear() % 100;

		let newLaboratoryNumber;
		let foundValidLaboratoryNumber = false;

		for (const doc of documents) {
			const laboratoryNumber =
				doc?.basicInfo?.fields.find(
					(field) => field._id.toString() === labNumberFieldId.toString()
				)?.data || '';

			// Define regex patterns for Test Report and Certificate
			const testReportPattern = /^(\d{4})\/(\d{2})$/;
			const certificatePattern = /^(\d{3})\/(\d{2})$/;

			let match;
			if (type === 'Test Report') {
				match = laboratoryNumber && laboratoryNumber.match(testReportPattern);
			} else if (type === 'Certificate') {
				match = laboratoryNumber && laboratoryNumber.match(certificatePattern);
			}

			if (match) {
				const [, documentNumber, documentYear] = match;
				const documentYearInt = parseInt(documentYear, 10);

				// If the document belongs to the current year, continue from the last valid number
				if (documentYearInt === currentYear) {
					const newDocumentNumber = parseInt(documentNumber, 10) + 1;
					newLaboratoryNumber =
						type === 'Test Report'
							? `${newDocumentNumber
									.toString()
									.padStart(4, '0')}/${currentYear}`
							: `${newDocumentNumber
									.toString()
									.padStart(3, '0')}/${currentYear}`;
					foundValidLaboratoryNumber = true;
					break;
				}

				// If it's from a previous year, ignore it and continue searching
			}
		}
		if (!foundValidLaboratoryNumber) {
			newLaboratoryNumber =
				type === 'Test Report' ? `0001/${currentYear}` : `001/${currentYear}`;
		}

		const pathsToRevalidate = [
			'/dashboard/laboratory/document/draft/[_id]',
			'/dashboard/laboratory/document/edit/[_id]',
			'/dashboard/laboratory/document/create',
			'/dashboard/laboratory/document',
		];

		pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));

		return NextResponse.json(
			{ laboratoryNumber: newLaboratoryNumber },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
