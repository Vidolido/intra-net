'use client';
import SelectInput from '@/components/inputs/SelectInput';
import { documentTypes } from './documentTypes';
import { findSettingType } from '@/utils/findSettingType';
import { nameArray } from '@/utils/nameArray';
import { useEffect } from 'react';
import { useLaboratoryDispatchContext } from '@/state/laboratoryContext';
import { ADD, ADD_TO_COLLECTION } from '@/state/actionTypes';

const DocumentType = ({ types, onChange, defaultValue, classes, name }) => {
	let dispatch = useLaboratoryDispatchContext();

	let documentTypes = findSettingType(types.settings, ['document']);
	let names = documentTypes?.map((setting) => ({
		id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));

	useEffect(() => {
		if (dispatch) {
			dispatch({
				type: ADD_TO_COLLECTION,
				payload: {
					state: 'header',
					value: { documentType: names[0].id },
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// const types = documentTypes;

	// console.log(names);
	return (
		<fieldset name='document-type'>
			<h6>DocumentType</h6>
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

export default DocumentType;
