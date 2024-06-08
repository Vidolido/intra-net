'use server';
import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';

export async function GET() {
	try {
		cookies();
		await dbConnect();
		const draftSettings = await Setting.find({ documentStatus: 'draft' }).sort({
			$natural: -1,
		});
		revalidatePath('/dashboard/settings/add', 'page');
		// revalidateTag('draft');
		return NextResponse.json({ draftSettings }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
