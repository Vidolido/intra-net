'use server';
import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';
// import Vehicle from '@/db/models/Vehicle';

export async function GET() {
	try {
		cookies();
		await dbConnect();
		const draft = await Setting.find({}).sort({ $natural: -1 }).limit(1);
		revalidatePath('/dashboard/settings/add', 'page');
		revalidateTag('draft');
		return NextResponse.json({ draft: draft[0] }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
