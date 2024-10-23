'use server';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// connection/models/db functions
import dbConnect from '@/db/conn';
import Document from '@/db/models/Document';

//draft/edit

export async function GET(request, { params }) {
	let { _id } = params;
	try {
		cookies();
		await dbConnect();
		const document = await Document.findOne({ _id });
		console.log(document, 'the  document');
		const pathsToRevalidate = [
			'/dashboard/laboratory/document/draft/[_id]',
			'/dashboard/laboratory/document/edit/[_id]',
			'/dashboard/laboratory/document/create',
			'/dashboard/laboratory/document',
		];

		pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));

		return NextResponse.json({ document }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
