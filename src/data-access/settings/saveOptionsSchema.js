'use server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
// import { buildPayload } from './buildOptionsSchemaPayload';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';

// export async function saveOptionSchema(data, documentId) {
export async function saveOptionSchema(state, documentId) {
  console.log(state, 'the data');
  console.log(documentId, 'the documentId');
  //   console.log(_id, 'the _id');
  try {
    cookies();
    // const _id = formData.get('document_id');

    // if (!documentId) {
    //   //   throw new Error('Document ID is missing.');
    //   return {
    //     error: {
    //       message: 'Document ID is missing.',
    //     },
    //   };
    // }

    let isSingularEmpty = Object.entries(state.parameter.name.singular).find(
      ([_, data]) => data.length > 0
    );
    let isPluralEmpty = Object.entries(state.parameter.name.plural).find(
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
    let document = await Setting.findOne({ _id: documentId });
    if (!document) {
      return {
        error: {
          message: 'Document not found.',
        },
      };
    }

    await Setting.updateOne(
      { _id: documentId },
      { $set: { optionsSchema: state } }
    );
    // console.log(test, 'the test');

    const pathsToRevalidate = [
      `/dashboard/settings/edit/${documentId}`,
      `/dashboard/settings/draft/${documentId}`,
      '/dashboard/settings/create',
    ];

    pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));

    return { message: 'Success', error: {} };
  } catch (error) {
    console.log('Failed to save option schema:', error);
    return {
      error: {
        message: error.message,
      },
    };
  }
}
