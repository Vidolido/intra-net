import { generateUUID } from '@/utils/generateUUID';

export const productsList = [
  {
    id: generateUUID(),
    type: 'UNL-95',
    colors: { primary: '#daeef3', secondary: '#95b3d7' },
    name: { en: 'UNL-95' },

    names: [],
  },
  {
    id: generateUUID(),
    type: 'UNL-98',
    colors: { primary: '#ebf1de', secondary: '#c4d79b' },
    name: { en: 'UNL-98' },
    names: [],
  },
  {
    id: generateUUID(),
    type: 'UNL-100',
    colors: { primary: '', secondary: '' },
    name: { en: 'UNL-100' },
    names: [],
  },
  {
    id: generateUUID(),
    type: 'Jet Fuel',
    colors: { primary: '#efefef', secondary: '#efefef' },
    name: { en: 'Jet Fuel' },
    names: [],
  },
  {
    id: generateUUID(),
    type: 'ULSD',
    colors: { primary: '#ffffcc', secondary: '#ffff00' },
    name: { en: 'ULSD' },
    names: [],
  },
  {
    id: generateUUID(),
    type: 'H.G.O.',
    colors: { primary: '#f2dcdb', secondary: '#da9694' },
    name: { en: 'H.G.O.' },
    names: [],
  },
  {
    id: generateUUID(),
    type: 'Fuel Oil',
    colors: { primary: '#d9d9d9', secondary: '#a6a6a6' },
    name: { en: 'Fuel Oil' },
    names: [],
  },
  {
    id: generateUUID(),
    type: 'L.P.G.',
    colors: { primary: '#e4dfec', secondary: '#ccc0da' },
    name: { en: 'L.P.G.' },
    names: [],
  },
  {
    id: generateUUID(),
    type: 'Water',
    colors: { primary: '', secondary: '' },
    name: { en: 'Water' },
    names: [],
  },
];

// {
// 	sector: 'some',
// 	settingName: 'Products',
// 	parameter: {
// 		singular: '',
// 		plural: '',
// 		inputValue: {}
// 	},
// 	collections: [
// 		type: [],
// 		colors: {}
// 		names: []
// 	]
// }
