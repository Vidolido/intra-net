'use server';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';
import { revalidatePath } from 'next/cache';

// Да исхендлаам ерори
export async function deleteDraftSetting(_id) {
  //   console.log('IT DID RUN');
  try {
    await dbConnect();
    await Setting.deleteOne({ _id });
    revalidatePath('/dashboard/settings', 'page');
    // return JSON.stringify(draft);
  } catch (error) {
    console.log('Failed to create draft setting error:', error);
    throw Error('Could not add draft setting to database: ' + error);
  }
}
