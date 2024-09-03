'use server';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Sector from '@/db/models/Sector';

export async function GET() {
  console.log('this function ran');
  try {
    cookies();
    await dbConnect();
    const sectors = await Sector.find({});
    revalidatePath('/');
    return NextResponse.json({ sectors }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
