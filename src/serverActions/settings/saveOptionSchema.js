'use server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';
import { buildPayload } from './buildOptionsSchemaPayload';

export async function saveOptionSchema(state, formData) {
  // console.log(formData, 'the form data');
  try {
    cookies();

    const _id = formData.get('document_id');
    if (!_id) {
      throw new Error('Document ID is missing.');
    }

    const payload = buildPayload(formData);

    let isSingularEmpty = Object.entries(payload.parameter.name.singular).find(
      (input) => input[1].length > 0
    );
    let isPluralEmpty = Object.entries(payload.parameter.name.plural).find(
      ([_, data]) => data.length > 0
    );
    if (isSingularEmpty == undefined) {
      return {
        error: {
          singular: 'Singular name is empty',
        },
      };
    }
    if (isPluralEmpty == undefined) {
      return {
        error: {
          plural: 'Plural name is empty',
        },
      };
    }

    await dbConnect();
    await Setting.updateOne({ _id }, { optionsSchema: payload });

    const pathsToRevalidate = [
      `/dashboard/settings/edit/${_id}`,
      `/dashboard/settings/draft/${_id}`,
      '/dashboard/settings/create',
    ];

    pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));

    return { message: 'Success', error: {} };
  } catch (error) {
    console.error('Failed to save option schema:', error);
    return {
      error: {
        message: error.message,
      },
    };
  }
}
