'use server';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';
import { revalidatePath } from 'next/cache';

export async function createSetting(_id, formData) {
  console.log(formData, 'THE FORM DATA');
  // console.log(_id, 'the id');

  let main = Object.entries(Object.fromEntries(formData)).filter((element) =>
    element[0].includes('main')
  );

  let collectionLanguageElements = Object.entries(
    Object.fromEntries(formData)
  ).filter((element) => element[0].includes('languages'));

  let otherElements = Object.entries(Object.fromEntries(formData)).filter(
    (element) =>
      !element[0].includes('ACTION') &&
      !element[0].includes('main') &&
      !element[0].includes('collection') &&
      element[0].split('-').length === 1
  );

  let sectorAndName = otherElements.reduce((acc, currentValue) => {
    let test = { [currentValue[0]]: currentValue[1] };
    acc = {
      ...acc,
      ...test,
    };
    return acc;
  }, {});

  let parameter = Array.from(main).reduce((acc, currentValue) => {
    let nameArray = currentValue[0].split('-');
    acc = {
      parameter: {
        name: {
          ...acc?.parameter?.name,
          [nameArray[1]]: {
            ...acc?.parameter?.name[nameArray[1]],

            [nameArray[nameArray.length - 1]]: currentValue[1],
          },
        },
        inputValue: {},
      },
    };
    return acc;
  }, {});

  let collections = Array.from(collectionLanguageElements).reduce(
    (acc, currentValue) => {
      let nameArray = currentValue[0].split('-');
      if (!Number.isNaN(Number(nameArray[0]))) {
        acc[nameArray[0]] = {
          name: {
            ...acc?.[nameArray[0]]?.name,
            [nameArray[nameArray.length - 1]]: currentValue[1],
          },
          items: [],
        };

        return acc;
      } else return acc;
    },
    []
  );

  let payload = {
    ...sectorAndName,
    optionsSchema: {
      ...parameter,
      collections,
    },
  };
  // console.log(payload.optionsSchema.parameter.name);
  // console.log(collectionLanguageElements, 'THE DAMN ELEMENTS');
  // console.log(collections, 'THE COLLECTIONS');
  // console.log(payload, 'the payload');
  try {
    await dbConnect();

    await Setting.updateOne(
      { _id },
      {
        $set: {
          ...payload,
        },
      }
    );
    revalidatePath('/dashboard/settings/add', 'page');
    // console.log(findDraft, 'THE  DRAFT');
  } catch (error) {
    console.log('createSetting error:', error);
    throw Error('Could not create setting in database: ' + error);
  }
}
