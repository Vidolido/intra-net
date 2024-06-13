'use server';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import LaboratoryTemplate from '@/db/models/LaboratoryTemplate';

export async function GET() {
  try {
    cookies();
    await dbConnect();
    const draft = await LaboratoryTemplate.find({ documentStatus: 'draft' })
      .sort({ $natural: -1 })
      .limit(1);

    revalidatePath('/dashboard/laboratory/templates/create', 'page');

    // revalidatePath('/');
    // console.log(draft, 'the draft template in the back');
    return NextResponse.json({ draft: draft[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
