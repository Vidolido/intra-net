import React from 'react';
import { countriesOfOrigin } from './countriesOfOrigin';
import SelectInput from '@/components/inputs/SelectInput';
import { nameArray } from '@/utils/nameArray';

const Origin = ({ countries }) => {
	// const origin = countriesOfOrigin;
	let names = countries?.settings.map((setting) => ({
		id: setting.id,
		...nameArray(setting.parameter.inputValue),
	}));
	// console.log(
	// 	countries?.settings.map((setting) => setting.id),
	// 	'names'
	// );
	// console.log(names);
	return (
		<fieldset name='countries-of-origin'>
			<h6>Origin</h6>
			{/* <SelectInput options={origin} parameter='name' defaultLanguage='en' /> */}
			<SelectInput options={names} value='id' defaultLanguage='en' />
		</fieldset>
	);
};

export default Origin;
