'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';
import { NextResponse } from 'next/server';

// export async function saveDocumentSettings(docId, formData) {
export async function saveDocumentSettings(state, formData) {
  //   console.log(state, 'THE STATE');
  //  let state = {
  // 	errors
  //  }
  let error;
  const _id = formData.get('document_id');
  let payload = {
    sector: formData.get('sector'),
    settingName: formData.get('settingName'),
    documentStatus: formData.get('documentStatus') || 'draft',
  };

  try {
    await dbConnect();
    let updated = await Setting.updateOne({ _id }, { ...payload });

    console.log(updated, 'updated');
    if (updated.matchedCount === 1 && updated.modifiedCount === 0) {
      //   return {
      //     error: 'Something went wrong, please try again.',
      //   };
      error = 'Something went wrong, please try again.';
    }

    return {
      error: error,
    };
  } catch (error) {
    console.log('Failed to create draft setting error:', error);
    throw Error('Could not add draft setting to database: ' + error);
    // return NextResponse.json({ templates }, { status: 200 });
    // return {
    //   error: { message: 'Something bad happend', error },
    // };
  }

  revalidatePath('/dashboard/settings', 'page');
}
