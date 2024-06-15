import { generateUUID } from '@/utils/generateUUID';

export const sampleTypes = [
	{
		id: generateUUID(),
		name: {
			en: 'Cistern',
			mk: 'А/Ц',
		},
		type: 'sample',
	},
	{
		id: generateUUID(),
		name: {
			en: 'Vagon',
			mk: 'В/Ц',
		},
		type: 'sample',
	},
	{
		id: generateUUID(),
		name: {
			en: 'Tanker',
			mk: 'Танкер',
		},
		type: 'sample',
	},
	{
		id: generateUUID(),
		name: {
			en: 'Tank',
			mk: 'Резервоар',
		},
		type: 'sample',
	},
	{
		id: generateUUID(),
		name: {
			en: 'Pipes',
			mk: 'Цевовод',
		},
		type: 'sample',
	},
	{
		id: generateUUID(),
		name: {
			en: 'Canister',
			mk: 'Канистер',
		},
		type: 'sample',
	},
	{
		id: generateUUID(),
		name: {
			en: 'Drainage tank',
			mk: 'Дренажен резервоар',
		},
		type: 'sample',
	},
	{
		id: generateUUID(),
		name: {
			en: 'Barrel',
			mk: 'Буре',
		},
		type: 'sample',
	},
	{
		id: generateUUID(),
		name: {
			en: 'Bottle',
			mk: 'Шише',
		},
		type: 'sample',
	},
	{
		id: generateUUID(),
		name: {
			en: 'Gas Station',
			mk: 'Бензинска Пумпа',
		},
		type: 'sample',
	},
];

// {
// 	sector: 'some',
// 	settingName: 'Sample Types',
// 	parameter: {
// 		singular: '',
// 		plural: '',
// 		inputValue: {}
// 	},
// }
