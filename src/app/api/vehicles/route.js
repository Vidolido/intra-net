'use server';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Vehicle from '@/db/models/Vehicle';

export async function GET() {
	try {
		cookies();
		await dbConnect();
		const vehicles = await Vehicle.find({});
		revalidatePath('/');
		return NextResponse.json({ vehicles }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
