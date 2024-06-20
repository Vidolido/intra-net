'use server';
import { NextResponse } from 'next/server';

// connection/models/db functions
import dbConnect from '@/db/conn';
import VehicleTransaction from '@/db/models/VehicleTransaction';

export async function GET() {
	try {
		await dbConnect();
		const transactions = await VehicleTransaction.find({})
			.populate('vehicle')
			.exec();
		return NextResponse.json({ transactions }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
