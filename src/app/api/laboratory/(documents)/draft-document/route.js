'use server';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// connection/models/db functions
import dbConnect from '@/db/conn';
import Document from '@/db/models/Document';

//create

export async function GET() {
	try {
		cookies();
		await dbConnect();
		const draft = await Document.find({ documentStatus: 'draft' })
			.sort({ $natural: -1 })
			.limit(1);

		const pathsToRevalidate = [
			'/dashboard/laboratory/document/draft/[_id]',
			'/dashboard/laboratory/document/edit/[_id]',
			'/dashboard/laboratory/document/create',
			'/dashboard/laboratory/document',
		];

		pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));

		return NextResponse.json({ draft: draft[0] }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
