'use server';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// connection/models/db functions
import dbConnect from '@/db/conn';
import LaboratoryTemplate from '@/db/models/LaboratoryTemplate';

export async function GET() {
	try {
		cookies();
		await dbConnect();
		const draftTemplates = await LaboratoryTemplate.find({
			documentStatus: 'draft',
		}).sort({ $natural: -1 });

		revalidatePath('/dashboard/laboratory/templates', 'page');

		return NextResponse.json({ draftTemplates }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
