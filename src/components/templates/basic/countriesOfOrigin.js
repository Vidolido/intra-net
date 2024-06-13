import { generateUUID } from '@/utils/generateUUID';

export const countriesOfOrigin = [
  {
    id: generateUUID(),
    name: {
      en: 'Albania',
      mk: 'Албанија',
    },
  },
  {
    id: generateUUID(),
    name: {
      en: 'Bulgaria',
      mk: 'Бугаија',
    },
  },
  {
    id: generateUUID(),
    name: {
      en: 'Greece',
      mk: 'Грција',
    },
  },
  {
    id: generateUUID(),
    name: {
      en: 'Macedonia',
      mk: 'Македонија',
    },
  },
  {
    id: generateUUID(),
    name: {
      en: 'Montenegro',
      mk: 'Црна Гора',
    },
  },
  {
    id: generateUUID(),
    name: {
      en: 'Romania',
      mk: 'Романија',
    },
  },
  {
    id: generateUUID(),
    name: {
      en: 'Srbia',
      mk: 'Србија',
    },
  },
];

// {
// 	sector: 'some',
// 	settingName: 'Countries of origin',
// 	parameter: {
// 		singular: '',
// 		plural: '',
// 		inputValue: {}
// 	},
//  collections: [
//	{ countries: []}
// ]
// }
