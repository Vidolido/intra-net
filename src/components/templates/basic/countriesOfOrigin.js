import { generateUUID } from '@/utils/generateUUID';

export const countriesOfOrigin = [
	{
		id: generateUUID(),
		name: {
			en: 'Albania',
			mk: 'Албанија',
		},
		locale: 'al-AL',
	},
	{
		id: generateUUID(),
		name: {
			en: 'Bulgaria',
			mk: 'Бугаија',
		},
		locale: 'bg-BG',
	},
	{
		id: generateUUID(),
		name: {
			en: 'Greece',
			mk: 'Грција',
			locale: 'el-GR',
		},
	},
	{
		id: generateUUID(),
		name: {
			en: 'Macedonia',
			mk: 'Македонија',
		},
		locale: 'mk-MK',
	},
	{
		id: generateUUID(),
		name: {
			en: 'Montenegro',
			mk: 'Црна Гора',
		},
		locale: 'me-ME',
	},
	{
		id: generateUUID(),
		name: {
			en: 'Romania',
			mk: 'Романија',
		},
		locale: 'ro-RO',
	},
	{
		id: generateUUID(),
		name: {
			en: 'Srbia',
			mk: 'Србија',
		},
		locale: 'sr-RS',
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
