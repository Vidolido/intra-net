'use server';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// connection/models/db functions
import dbConnect from '@/db/conn';
import Analysis from '@/db/models/Analysis';

export async function GET() {
	try {
		cookies();
		await dbConnect();
		const draft = await Analysis.find({ documentStatus: 'draft' })
			.sort({ $natural: -1 })
			.limit(1);

		revalidatePath('/dashboard/laboratory/templates/create', 'page');

		return NextResponse.json({ draft: draft[0] }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
