'use server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';
import { buildPayload } from './buildOptionsSchemaPayload';

export async function saveOptionSchema(state, formData) {
  console.log(formData, 'the form data');
  try {
    cookies();

    const _id = formData.get('document_id');
    if (!_id) {
      throw new Error('Document ID is missing.');
    }

    const payload = buildPayload(formData);

    await dbConnect();
    await Setting.updateOne({ _id }, { optionsSchema: payload });

    const pathsToRevalidate = [
      `/dashboard/settings/edit/${_id}`,
      `/dashboard/settings/draft/${_id}`,
      '/dashboard/settings/add',
    ];

    pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));

    return { message: 'Success' };
  } catch (error) {
    console.error('Failed to save option schema:', error);
    return { error: error.message };
  }
}
// export async function saveOptionSchema(state, formData) {
//   cookies();
//   let _id = formData.get('document_id');

//   let payload = Array.from(formData).reduce((acc, [key, value]) => {
//     if (key === 'document_id') return acc;

//     if (key.includes('plural')) {
//       let lang = key.split('-')[1];
//       acc = {
//         ...acc,
//         parameter: {
//           ...acc.parameter,
//           name: {
//             ...acc.parameter?.name,
//             plural: {
//               ...acc.parameter?.name?.plural,
//               [lang]: value,
//             },
//           },
//         },
//       };
//     } else if (key.includes('singular')) {
//       let lang = key.split('-')[1];
//       acc = {
//         ...acc,
//         parameter: {
//           ...acc.parameter,
//           name: {
//             ...acc.parameter?.name,
//             singular: {
//               ...acc.parameter?.name?.singular,
//               [lang]: value,
//             },
//           },
//         },
//       };
//     } else if (key.includes('collection')) {
//       const nameParts = key.match(/collection\[(\d+)\]-(\w+)/);
//       const collectionIndex = parseInt(nameParts[1], 10);
//       const lang = nameParts[2];

//       if (!acc.collections) {
//         acc.collections = [];
//       }

//       if (!acc.collections[collectionIndex]) {
//         acc.collections[collectionIndex] = { name: {} };
//       }

//       acc.collections[collectionIndex].name[lang] = value;
//     }

//     return acc;
//   }, {});

//   try {
//     await dbConnect();
//     await Setting.updateOne({ _id }, { optionsSchema: payload });
//     revalidatePath('/dashboard/settings/edit/[_id]', 'page');
//     revalidatePath('/dashboard/settings/draft/[_id]', 'page');
//     revalidatePath('/dashboard/settings/add', 'page');
//     return {
//       message: 'Success',
//     };
//   } catch (error) {
//     return { error: error.message };
//   }
// }
