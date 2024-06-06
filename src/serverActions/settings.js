'use server';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';
import { revalidatePath } from 'next/cache';

// export async function makeDraftSetting() {
//   console.log('IT DID RUN');
//   try {
//     await dbConnect();
//     const res = await Setting.create({ documentStatus: 'draft' });
//     revalidatePath('/dashboard/settings', 'page');
//     console.log(res, 'THE RES');
//     return JSON.stringify(res);
//   } catch (error) {
//     console.log('addNewVehicle error:', error);
//     throw Error('Could not add vehicle to database: ' + error);
//   }
//   // try {
//   // 	await Vehicle.create(payload);
//   // } catch (error) {
//   // 	console.log('addNewVehicle error:', error);
//   // 	throw Error('Could not add vehicle to database: ' + error);
//   // }
// }

export async function createSetting(formData) {
  console.log(formData, 'THE FORM DATA');

  let main = Object.entries(Object.fromEntries(formData)).filter((element) =>
    element[0].includes('main')
  );

  let collection = Object.entries(Object.fromEntries(formData)).filter(
    (element) => element[0].includes('collection')
  );

  let rest = Object.entries(Object.fromEntries(formData)).filter(
    (element) =>
      !element[0].includes('ACTION') &&
      !element[0].includes('main') &&
      !element[0].includes('collection') &&
      element[0].split('-').length === 1
  );

  let parameter = Array.from(main).reduce((acc, currentValue) => {
    let nameArray = currentValue[0].split('-');
    acc = {
      parameter: {
        name: {
          ...acc?.parameter?.name,
          [nameArray[1]]: {
            ...acc?.parameter?.name[nameArray[1]],

            [nameArray[nameArray.length - 1]]: currentValue.value,
          },
        },
        value: {},
      },
    };
    return acc;
  }, {});

  let collections = Array.from(collection).reduce(
    (acc, currentValue) => {
      let nameArray = currentValue[0].split('-');

      console.log(nameArray, 'THE');
      let collection = {
        name: {
          ...acc?.collections[nameArray[0]]?.name,
          [nameArray[nameArray.length - 1]]: currentValue[1],
        },
        collection: [],
      };

      // acc.collections[nameArray[0]] = collection;
      acc.collections.push(collection);

      console.log(collection, 'THE COLL FROM IN');

      return acc;
    },
    {
      collections: [],
    }
  );

  const payload = Object.entries(Object.fromEntries(formData)).reduce(
    (acc, currentValue) => {
      if (currentValue[0].includes('ACTION') || !currentValue) return;
      // let test = ;
      if (currentValue[0].includes('main')) {
        if (currentValue[0].includes('main-plural')) {
          let element = currentValue[0].split('-');
          let lang = element[element.length - 1];
          acc = {
            ...acc,
            parameter: {
              ...acc?.parameter,
              name: {
                ...acc?.parameter?.name,
                plural: { [lang]: currentValue[1] },
              },
            },
          };
        }
        if (currentValue[0].includes('main-singular')) {
          let element = currentValue[0].split('-');
          let lang = element[element.length - 1];
          acc = {
            ...acc,
            parameter: {
              ...acc?.parameter,
              name: {
                ...acc?.parameter?.name,
                singular: { [lang]: currentValue[1] },
              },
            },
          };
        }
      }

      if (!Number.isNaN(Number(currentValue[0].split('-')[0]))) {
        let nameArray = currentValue[0].split('-');
        let hasProp = Object.hasOwn(acc, 'collections');
        if (!hasProp) {
          Object.defineProperty(acc, 'collections', {
            value: [],
            enumerable: true,
            writable: true,
          });
        }
      }

      return acc;
    },
    {}
  );
  // console.log(payload, 'THE PAYLOAD');
  console.log(parameter);
  console.log(collections);
  // console.log(rest);
  // console.log(main);
  // console.log(collections);
  // const payload = {
  //   sector: formData.get('sector'),
  //   settingName: formData.get('settingName'),
  //   optionSchema: {
  //     parameter: {
  //       name: {
  //       },
  //     },
  //   },
  // };
  // const payload = formData.payload;
  // console.log(payload, 'THE FORM DATA IN CREATE SETTING');
}
