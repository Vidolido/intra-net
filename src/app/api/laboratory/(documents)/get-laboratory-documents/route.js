'use server';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// connection/models/db functions
import dbConnect from '@/db/conn';
import Document from '@/db/models/Document';
// import Analysis from '@/db/models/Analysis';

export async function GET(request) {
	let documentStatus =
		request.nextUrl?.searchParams?.get('documentStatus') || 'draft';
	let sorted = request.nextUrl?.searchParams?.get('sorted') ? true : false;

	// console.log(request, 'THE REEEQQQQEESTTTT');
	try {
		cookies();
		await dbConnect();

		let matchStage = {};
		if (documentStatus) {
			matchStage = { documentStatus: documentStatus };
		}

		let pipeline = [{ $match: matchStage }];
		if (sorted) {
			pipeline.push(
				{
					$group: {
						_id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
						documents: { $push: '$$ROOT' },
					},
				},
				{
					$project: {
						_id: 0,
						date: '$_id',
						documents: 1,
					},
				},
				{
					$sort: { date: -1 },
				}
			);
		} else {
			pipeline.push({
				$sort: { createdAt: -1 },
			});
		}
		const documents = await Document.aggregate(pipeline);
		return NextResponse.json({ documents }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
