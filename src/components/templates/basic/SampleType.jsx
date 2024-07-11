'use client';
import { useEffect } from 'react';

// state/actions
import { findSettingType } from '@/utils/findSettingType';
import { nameArray } from '@/utils/nameArray';

// components
import SelectInput from '@/components/inputs/SelectInput';

const SampleType = ({ types, setHeader, classes, name, none }) => {
	let sampleTypes = findSettingType(types.settings, ['sample']);
	let names = sampleTypes?.map((setting) => ({
		_id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));

	useEffect(() => {
		if (setHeader)
			setHeader((prev) => ({
				...prev,
				sampleType: !none ? names[0]._id : 'none',
			}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<fieldset name='sample-types'>
			<h6>Sample Type</h6>
			<SelectInput
				name={name}
				options={names}
				value='id'
				none={none}
				onChange={(e) =>
					setHeader
						? setHeader((prev) => ({
								...prev,
								sampleType: e.target.value,
						  }))
						: null
				}
				defaultLanguage='en'
				classes={classes}
			/>
		</fieldset>
	);
};

export default SampleType;
