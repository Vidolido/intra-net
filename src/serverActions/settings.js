'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';

export async function createSetting(_id, formData) {
  console.log(formData, 'the form data');
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
    let fields = { [currentValue[0]]: currentValue[1] };
    acc = {
      ...acc,
      ...fields,
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
        let language = nameArray.splice(1);
        if (!acc[nameArray[0]]) {
          acc[nameArray[0]] = [
            {
              [nameArray[0] + '-' + language.join('-')]: currentValue[1],
            },
          ];
        } else {
          acc[nameArray[0]].push({
            [nameArray[0] + '-' + language.join('-')]: currentValue[1],
          });
        }

        return acc;
      }
      return acc;
    },
    []
  );

  let optionsSchemaCollections = Array.from(collectionLanguageElements).reduce(
    (acc, currentValue) => {
      let nameArray = currentValue[0].split('-');
      if (!Number.isNaN(Number(nameArray[0]))) {
        acc[nameArray[0]] = {
          name: {
            ...acc[nameArray[0]]?.name,
            [currentValue[0]]: currentValue[1],
          },
          items: [],
        };

        return acc;
      } else return acc;
    },
    []
  );

  let optionsSchema = {
    ...parameter,
    collections: [...optionsSchemaCollections],
  };

  try {
    await dbConnect();

    await Setting.updateOne(
      { _id },
      {
        $set: {
          ...sectorAndName,
          collections: [...collections],
          optionsSchema: { ...optionsSchema },
        },
      },
      { upsert: true }
    );
    revalidatePath('/dashboard/settings/add', 'page');
  } catch (error) {
    console.log('createSetting error:', error);
    throw Error('Could not create setting in database: ' + error);
  }
}
