'use server';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// connection/models/db functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';

export async function GET() {
  try {
    cookies();
    await dbConnect();
    const groups = await Setting.findOne({
      settingName: 'Grouped Parameters',
    });
    // revalidatePath('/dashboard/laboratory/templates/draft/[_id]', 'page');
    return NextResponse.json({ groups }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
