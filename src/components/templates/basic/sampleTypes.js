import { generateUUID } from '@/utils/generateUUID';

export const sampleTypes = [
	{
		id: generateUUID(),
		name: {
			en: 'Cistern',
			mk: 'А/Ц',
		},
	},
	{
		id: generateUUID(),
		name: {
			en: 'Vagon',
			mk: 'В/Ц',
		},
	},
	{
		id: generateUUID(),
		name: {
			en: 'Tanker',
			mk: 'Танкер',
		},
	},
	{
		id: generateUUID(),
		name: {
			en: 'Tank',
			mk: 'Резервоар',
		},
	},
	{
		id: generateUUID(),
		name: {
			en: 'Pipes',
			mk: 'Цевовод',
		},
	},
	{
		id: generateUUID(),
		name: {
			en: 'Canister',
			mk: 'Канистер',
		},
	},
	{
		id: generateUUID(),
		name: {
			en: 'Drainage tank',
			mk: 'Дренажен резервоар',
		},
	},
	{
		id: generateUUID(),
		name: {
			en: 'Barrel',
			mk: 'Буре',
		},
	},
	{
		id: generateUUID(),
		name: {
			en: 'Bottle',
			mk: 'Шише',
		},
	},
	{
		id: generateUUID(),
		name: {
			en: 'Gas Station',
			mk: 'Бензинска Пумпа',
		},
	},
];
