'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/SettingOld';

export async function makeDraftSetting() {
  try {
    await dbConnect();
    const draft = await Setting.create({ documentStatus: 'draft' });

    const pathsToRevalidate = [
      '/dashboard/settings/draft/[_id]',
      '/dashboard/settings/edit/[_id]',
      '/dashboard/settings/create',
      '/dashboard/settings',
    ];

    pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));

    return { _id: draft._id.toString() };
  } catch (error) {
    console.log('Failed to create draft setting error:', error);
    throw Error('Could not add draft setting to database: ' + error);
  }
}
