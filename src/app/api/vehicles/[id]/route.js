'use server';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// connection/models/db functions
import dbConnect from '@/db/conn';
import Vehicle from '@/db/models/Vehicle';

export async function GET(req, { params }) {
	const { id } = params;
	try {
		await dbConnect();
		const vehicle = await Vehicle.findOne({ _id: id });
		revalidatePath('/dashboard/administration/vehicles', 'page');
		return NextResponse.json({ vehicle }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
