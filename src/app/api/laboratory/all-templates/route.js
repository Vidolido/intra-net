'use server';
import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

// connection/models/db functions
import dbConnect from '@/db/conn';
import LaboratoryTemplate from '@/db/models/LaboratoryTemplate';

export async function GET() {
	try {
		cookies();
		await dbConnect();
		const laboratoryTemplates = await LaboratoryTemplate.find({});
		revalidatePath('/dashboard/laboratory/templates/create', 'page');
		return NextResponse.json({ laboratoryTemplates }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
