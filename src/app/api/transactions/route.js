'use server';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import VehicleTransaction from '@/db/models/VehicleTransaction';

export async function GET() {
	try {
		// cookies();

		await dbConnect();
		const transactions = await VehicleTransaction.find({})
			.populate('vehicle')
			.exec();
		// revalidateTag('transactions');
		// console.log
		// const transactions = await Transaction.find();
		// console.log(transactionsOne, 'transactionOne');
		// const transactions = await Transaction.find({ status: 'pending' });
		return NextResponse.json({ transactions }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
