'use server';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// connection/models/db functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/SettingOld';

export async function GET() {
  try {
    cookies();
    await dbConnect();
    const published = await Setting.find({
      documentStatus: 'published',
      isDeleted: 'false',
    }).sort({
      $natural: -1,
    });
    revalidatePath('/dashboard/settings/add', 'page');
    return NextResponse.json({ published }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
