'use client';
import { useEffect } from 'react';
import { countriesOfOrigin } from './countriesOfOrigin';
import SelectInput from '@/components/inputs/SelectInput';
import { nameArray } from '@/utils/nameArray';
import { useLaboratoryDispatchContext } from '@/state/laboratoryContext';
import { ADD, ADD_TO_COLLECTION } from '@/state/actionTypes';

const Origin = ({ countries, onChange, defaultValue, classes, name }) => {
	let dispatch = useLaboratoryDispatchContext();

	// const origin = countriesOfOrigin;
	let names = countries?.settings.map((setting) => ({
		id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));

	useEffect(() => {
		if (dispatch) {
			dispatch({
				type: ADD_TO_COLLECTION,
				payload: {
					state: 'header',
					value: { origin: names[0].id },
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// console.log(
	// 	countries?.settings.map((setting) => setting.id),
	// 	'names'
	// );
	// console.log(names);
	return (
		<fieldset name='countries-of-origin'>
			<h6>Origin</h6>
			{/* <SelectInput options={origin} parameter='name' defaultLanguage='en' /> */}
			<SelectInput
				name={name}
				options={names}
				value='id'
				defaultLanguage='en'
				defaultValue={defaultValue}
				onChange={onChange}
				classes={classes}
			/>
		</fieldset>
	);
};

export default Origin;
