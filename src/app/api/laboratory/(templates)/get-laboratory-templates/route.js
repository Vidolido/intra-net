'use server';
import { NextResponse } from 'next/server';
// import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// connection/models/db functions
import dbConnect from '@/db/conn';
import LaboratoryTemplate from '@/db/models/LaboratoryTemplate';

export async function GET(request) {
	let documentStatus =
		request.nextUrl?.searchParams?.get('documentStatus') || '';
	try {
		cookies();
		await dbConnect();
		const templates = await LaboratoryTemplate.find({ documentStatus });
		// revalidatePath('/dashboard/laboratory/templates/draft/[_id]', 'page');
		return NextResponse.json({ templates }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
