'use server';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// connection/models/db functions
import dbConnect from '@/db/conn';
// import LaboratoryTemplate from '@/db/models/LaboratoryTemplate';
import Analysis from '@/db/models/Analysis';

export async function GET(request) {
  let documentStatus = request.nextUrl.searchParams.get('documentStatus');

  let query = Array.from(request.nextUrl.searchParams).map((param) => ({
    [param[0]]: param[1],
  }));
  console.log(query, 'ova'); // do tuka sum
  try {
    cookies();
    await dbConnect();
    const documents = !documentStatus
      ? await Analysis.find({})
      : await Analysis.find({ documentStatus });
    return NextResponse.json({ documents }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
