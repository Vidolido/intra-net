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

		let currentYear = new Date().getFullYear();
		const startOfYear = new Date(currentYear, 0, 1);
		const endOfYear = new Date(currentYear + 1, 0, 1);

		const documents = await Document.find({
			'header.documentType': documentType,
			createdAt: {
				$gte: startOfYear,
				$lt: endOfYear,
			},
		}).sort({ createdAt: -1 });
		const types = await Setting.findOne({ settingName: 'Types' }).lean().exec();
		const fields = await Setting.findOne({ settingName: 'Fields' })
			.lean()
			.exec();

		const labNumberFieldId = fields?.settings
			.find((setting) => setting?.parameter?.en === 'Laboratory Number')
			._id.toString();

		let type = documentType
			? types?.settings.find((set) => set._id.toString() === documentType)
					?.parameter?.en
			: undefined;

		currentYear = currentYear % 100;

		let newLaboratoryNumber;
		let highestLaboratoryNumberForTheYear = 0;

		for (const doc of documents) {
			const laboratoryNumber =
				doc?.documentMeta.find((field) => field._id === labNumberFieldId)
					?.value || '';

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

				if (documentYearInt === currentYear) {
					const currentDocumentNumber = parseInt(documentNumber, 10);
					if (currentDocumentNumber > highestLaboratoryNumberForTheYear) {
						highestLaboratoryNumberForTheYear = currentDocumentNumber;
					}
				}
			}
		}

		const nextDocumentNumber = highestLaboratoryNumberForTheYear + 1;
		newLaboratoryNumber =
			type === 'Test Report'
				? `${nextDocumentNumber.toString().padStart(4, '0')}/${currentYear}`
				: type === 'Certificate'
				? `${nextDocumentNumber.toString().padStart(3, '0')}/${currentYear}`
				: '';

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
