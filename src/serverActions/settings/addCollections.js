'use server';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';
import { revalidatePath } from 'next/cache';

export async function addCollections(collection, document) {
  console.log(document, '~IT DID RUN');
  const { _id } = document;
  try {
    await dbConnect();
    const foundDocument = await Setting.updateOne(
      { _id },
      { $set: { collections: collection } }
    )
      .lean()
      .exec();
    console.log(foundDocument, 'the document');
    return JSON.stringify(foundDocument);
  } catch (error) {
    console.log('Failed to create draft setting error:', error);
    throw Error('Could not add draft setting to database: ' + error);
  }
  //   try {
  //     await dbConnect();
  //     const res = await Setting.create({ documentStatus: 'draft' });
  //     revalidatePath('/dashboard/settings/add', 'page');
  //     // console.log(res, 'THE RES');
  //     return JSON.stringify(res);
  //   } catch (error) {
  //     console.log('Failed to create draft setting error:', error);
  //     throw Error('Could not add draft setting to database: ' + error);
  //   }
}

// export const returnVehicle = async ({ transaction, vehicle }) => {
// try {
//   await dbConnect();
//   await Vehicle.updateOne({ _id: vehicle }, { user: 'none', inUse: false });
//   await VehicleTransaction.updateOne(
//     { _id: transaction },
//     { status: 'complete', returnTime: new Date() }
//   );
//   revalidatePath('/', 'page');
//   return {
//     error: {
//       returnVehicle: '',
//     },
//   };
// } catch (error) {
//   console.log('returnVehicle error:', error);
//   throw Error('Could not insert transaction to database: ' + error);
// }
// };
