import React from 'react';
import { countriesOfOrigin } from './countriesOfOrigin';
import SelectInput from '@/components/inputs/SelectInput';

const Origin = () => {
	const origin = countriesOfOrigin;
	return (
		<fieldset>
			<h6>Origin</h6>
			<SelectInput options={origin} value='type' defaultLanguage='en' />
		</fieldset>
	);
};

export default Origin;
