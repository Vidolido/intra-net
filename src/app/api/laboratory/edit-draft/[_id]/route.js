'use server';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// connection/models/db functions
import dbConnect from '@/db/conn';
import LaboratoryTemplate from '@/db/models/LaboratoryTemplate';

export async function GET(request, { params }) {
	let { _id } = params;
	try {
		cookies();
		await dbConnect();
		const draft = await LaboratoryTemplate.findOne({ _id });
		revalidatePath('/dashboard/laboratory/templates/draft/[_id]', 'page');
		return NextResponse.json({ draft }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
