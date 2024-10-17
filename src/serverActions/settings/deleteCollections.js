'use server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/SettingOld';

export async function deleteCollections(collectionToDelete, document) {
  const { _id } = document;
  try {
    cookies();
    await dbConnect();
    const foundDocument = await Setting.findOne({ _id });
    let optionsSchema = foundDocument.optionsSchema;

    optionsSchema.collections = optionsSchema.collections.filter(
      (collection) =>
        JSON.stringify(collection) !== JSON.stringify(collectionToDelete)
    );

    const updatedDocument = await Setting.updateOne(
      { _id },
      { $set: { optionsSchema } }
    )
      .lean()
      .exec();
    revalidatePath('/dashboard/settings/add', 'page');
    return JSON.stringify(updatedDocument);
  } catch (error) {
    console.log('Failed to create draft setting error:', error);
    throw Error('Could not add draft setting to database: ' + error);
  }
}
