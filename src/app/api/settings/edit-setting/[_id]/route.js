'use server';
import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

// connection/models/db functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';

export async function GET(request, { params }) {
	let { _id } = params;
	// console.log('THIS HAS BEEN RUNNING');
	try {
		cookies();
		await dbConnect();
		const published = await Setting.findOne({ _id });
		revalidatePath('/dashboard/settings/edit/[_id]', 'page');
		// revalidateTag('published');
		return NextResponse.json({ published }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
