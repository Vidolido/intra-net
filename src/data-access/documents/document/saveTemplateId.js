'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Document from '@/db/models/Document';

// I NEED TO HANDLE ERRORS HERE
export async function saveTemplateId(templateId, header, documentId) {
  // console.log(templateId, header, documentId, 'OVOOOOOAAAA');
  try {
    await dbConnect();
    await Document.updateOne(
      { _id: documentId },
      {
        $set: { header, templateId },
      }
    );

    const pathsToRevalidate = [
      '/dashboard/laboratory/analyses/draft/[_id]',
      '/dashboard/laboratory/analyses/edit/[_id]',
      '/dashboard/laboratory/analyses/create',
    ];

    pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));

    return { message: 'save successful' };
  } catch (error) {
    console.log('Failed to save template id. Error:', error);
    throw Error('Could not save template id to document: ' + error);
  }
}
