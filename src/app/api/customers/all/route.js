'use server';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Customer from '@/db/models/Customer';

export async function GET() {
	try {
		cookies();
		await dbConnect();
		const customers = await Customer.find({});

		const pathsToRevalidate = [
			'/dashboard/laboratory/document/draft/[_id]',
			'/dashboard/laboratory/document/edit/[_id]',
			'/dashboard/laboratory/document/create',
			'/dashboard/laboratory/document',
		];

		pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));
		return NextResponse.json({ customers }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
