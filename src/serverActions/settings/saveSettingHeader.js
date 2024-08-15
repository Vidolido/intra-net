'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

// TODO: Handle errors
// TODO: Rename this function: saveSettingHeader
export async function saveSettingHeader(state, formData) {
  const _id = formData.get('document_id');
  let payload = {
    sector: formData.get('sector'),
    settingName: formData.get('settingName'),
    documentStatus: formData.get('documentStatus') || 'draft',
  };
  console.log(state, 'THE STATE BRATUUU');
  try {
    await dbConnect();
    await Setting.updateOne({ _id }, { ...payload });

    const pathsToRevalidate = [
      `/dashboard/settings/edit/${_id}`,
      `/dashboard/settings/draft/${_id}`,
      '/dashboard/settings/create',
    ];

    pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));

    state = {
      ...state,
      message: 'Save successful.',
    };
    // return NextResponse.json({ state }, { status: 200 });
    // return {
    //   message: 'Save successful.',
    // };

    // return state;
  } catch (error) {
    // state.error = error.message;
    state = {
      ...state,
      error: error.message,
    };
    // return { error: error.message };
    // return NextResponse.json({ state }, { status: 500 });

    // return state;
  } finally {
    // return state;
    if (payload.documentStatus === 'draft') {
      redirect(`/dashboard/settings/draft/${_id}`);
    }
    if (payload.documentStatus === 'published') {
      redirect(`/dashboard/settings/edit/${_id}`);
    }
  }
}
