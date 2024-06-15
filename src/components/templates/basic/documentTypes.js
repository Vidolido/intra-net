const { generateUUID } = require('@/utils/generateUUID');

export const documentTypes = [
	{
		id: generateUUID(),
		name: {
			en: 'Import',
			mk: 'Импорт',
		},
		type: 'document',
	},
	{
		id: generateUUID(),
		name: {
			en: 'Export',
			mk: 'Експорт',
		},
		type: 'document',
	},
	{
		id: generateUUID(),
		name: {
			en: 'Offer',
			mk: 'Понуда',
		},
		type: 'document',
	},
	{
		id: generateUUID(),
		name: {
			en: 'Research analysis',
			mk: 'Истражна анализа',
		},
		type: 'document',
	},
];

// {
// 	sector: 'some',
// 	settingName: 'Document Types',
// 	parameter: {
// 		singular: '',
// 		plural: '',
// 		inputValue: {}
// 	},
//  collections: [
// {
// 	types: []
// }
// ]
// }
