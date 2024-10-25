'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';

// TODO: Handle errors
export async function saveSettingHeader(state, formData) {
  const _id = formData.get('document_id');

  let payload = {
    sector: formData.get('sector'),
    settingName: formData.get('settingName'),
    documentStatus: formData.get('status') || 'draft',
  };

  let shouldRedirect = false;

  try {
    await dbConnect();
    let updated = await Setting.updateOne({ _id }, { ...payload });

    shouldRedirect = updated.modifiedCount === 1 ? true : false;

    const pathsToRevalidate = [
      `/dashboard/settings/edit/[_id]`,
      `/dashboard/settings/draft/[_id]`,
      '/dashboard/settings/create',
    ];

    pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));

    return {
      message: 'Save successful.',
    };
  } catch (error) {
    console.log('Failed to save setting, error:', error);
    return {
      error: error.message,
    };
  } finally {
    if (shouldRedirect) {
      let redirectTo =
        payload.documentStatus === 'published' ? 'edit' : 'draft';
      redirect(`/dashboard/settings/${redirectTo}/${_id}`);
    }
  }
}
