'use server';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// connection/models/db functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';

export async function GET(request, { params }) {
  let { _id } = params;
  try {
    await dbConnect();
    const setting = await Setting.findOne({ _id });

    const pathsToRevalidate = [
      `/dashboard/settings/edit/${_id}`,
      `/dashboard/settings/draft/${_id}`,
      '/dashboard/settings/create',
    ];

    pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));

    return NextResponse.json({ setting }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
