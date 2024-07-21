'use server';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// connection/models/db functions
import dbConnect from '@/db/conn';
import Analysis from '@/db/models/Analysis';

export async function GET(request, { params }) {
	let { _id } = params;
	try {
		cookies();
		await dbConnect();
		const document = await Analysis.findOne({ _id });
		revalidatePath('/dashboard/laboratory/analysis/edit/[_id]', 'page');
		return NextResponse.json({ document }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
