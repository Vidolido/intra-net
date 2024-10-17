'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/SettingOld';

// Да исхендлаам ерори
export async function deleteSettingDocument(_id, type) {
  try {
    await dbConnect();
    if (type === 'draft') {
      await Setting.deleteOne({ _id });
    } else {
      await Setting.updateOne({ _id }, { $set: { isDeleted: true } });
    }
    revalidatePath('/dashboard/settings', 'page');
    // i should return a message here
  } catch (error) {
    console.log('Failed to delete draft setting error:', error);
    throw Error('Could not delete setting to database: ' + error);
  }
}
