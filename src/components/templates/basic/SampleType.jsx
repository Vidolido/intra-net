'use client';
import { useEffect } from 'react';

// state/actions
import { ADD_TO_COLLECTION } from '@/state/actionTypes';
import { useLaboratoryDispatchContext } from '@/state/laboratoryContext';
import { findSettingType } from '@/utils/findSettingType';
import { nameArray } from '@/utils/nameArray';

// components
import SelectInput from '@/components/inputs/SelectInput';

const SampleType = ({ types, onChange, defaultValue, classes, name }) => {
	let dispatch = useLaboratoryDispatchContext();

	let sampleTypes = findSettingType(types.settings, ['sample']);
	let names = sampleTypes?.map((setting) => ({
		id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));

	useEffect(() => {
		if (dispatch) {
			dispatch({
				type: ADD_TO_COLLECTION,
				payload: {
					state: 'header',
					value: { sampleType: names[0].id },
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<fieldset name='sample-types'>
			<h6>Sample Type</h6>

			<SelectInput
				name={name}
				options={names}
				value='id'
				none={true}
				onChange={onChange}
				defaultLanguage='en'
				defaultValue={defaultValue}
				classes={classes}
			/>
		</fieldset>
	);
};

export default SampleType;
