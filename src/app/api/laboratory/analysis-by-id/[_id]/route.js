'use server';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// connection/models/db functions
import dbConnect from '@/db/conn';
// import LaboratoryTemplate from '@/db/models/LaboratoryTemplate';
import Analysis from '@/db/models/Analysis';

export async function GET(request, { params }) {
	let { _id } = params;
	console.log(_id, 'IT RAN');
	try {
		cookies();
		await dbConnect();
		const published = await Analysis.findOne({ _id });
		revalidatePath('/dashboard/laboratory/analysis/edit/[_id]', 'page');
		return NextResponse.json({ published }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
