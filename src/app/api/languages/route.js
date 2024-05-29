'use server';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Language from '@/db/models/Language';

export async function GET() {
	try {
		cookies();
		await dbConnect();
		const languages = await Language.find({});
		revalidatePath('/');
		return NextResponse.json({ languages }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
