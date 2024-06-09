const { generateUUID } = require('@/utils/generateUUID');

export const documentTypes = [
	{
		id: generateUUID(),
		name: {
			en: 'Import',
			mk: 'Импорт',
		},
	},
	{
		id: generateUUID(),
		name: {
			en: 'Export',
			mk: 'Експорт',
		},
	},
	{
		id: generateUUID(),
		name: {
			en: 'Offer',
			mk: 'Понуда',
		},
	},
	{
		id: generateUUID(),
		name: {
			en: 'Research analysis',
			mk: 'Истражна анализа',
		},
	},
];
