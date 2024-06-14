'use server';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';
// import Vehicle from '@/db/models/Vehicle';

export async function GET(request, { params }) {
  let { _id } = params;
  console.log(request.nextUrl, 'THE params');
  console.log(_id, 'params');
  try {
    cookies();
    await dbConnect();
    const draft = await Setting.findOne({ _id });
    revalidatePath('/dashboard/settings/draft/[_id]', 'page');
    revalidateTag('draft');
    return NextResponse.json({ draft }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
