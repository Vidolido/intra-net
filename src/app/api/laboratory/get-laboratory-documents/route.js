'use server';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// connection/models/db functions
import dbConnect from '@/db/conn';
// import LaboratoryTemplate from '@/db/models/LaboratoryTemplate';
import Analysis from '@/db/models/Analysis';

export async function GET(request) {
	const query = {};

	if (request.nextUrl?.searchParams?.get('documentStatus')) {
		query.documentStatus = request.nextUrl?.searchParams?.get('documentStatus');
	}
	if (request.nextUrl?.searchParams?.get('time') === 'today') {
		const now = new Date();
		const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
		query.createdAt = { $gte: twentyFourHoursAgo };
	}
	// console.log(query, 'the query');
	try {
		cookies();
		await dbConnect();
		const documents = await Analysis.find(query);
		return NextResponse.json({ documents }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
