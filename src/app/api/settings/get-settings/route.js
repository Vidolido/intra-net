'use server';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// connection/models/db functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';

export async function GET(request) {
  let documentStatus =
    request?.nextUrl?.searchParams?.get('documentStatus') || 'draft';

  let isDeleted = request?.nextUrl?.searchParams?.get('isDeleted') || false;
  try {
    await dbConnect();
    const settings = await Setting.find({ documentStatus, isDeleted }).sort({
      $natural: -1,
    });
    revalidatePath('/dashboard/settings', 'page');

    return NextResponse.json({ settings }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
