'use client';
import { useEffect } from 'react';

// state/actions
import { findSettingType } from '@/utils/findSettingType';
import { nameArray } from '@/utils/nameArray';

// components
import SelectInput from '@/components/inputs/SelectInput';

const SampleType = ({
	name,
	types,
	value,
	none,
	languages,
	setHeader,
	classes,
}) => {
	// let sampleTypes = findSettingType(types, ['sample']);
	// let names = sampleTypes?.map((setting) => ({
	// 	_id: setting._id,
	// 	...nameArray(setting.parameter.inputValue),
	// }));

	// useEffect(() => {
	// 	if (setHeader)
	// 		setHeader((prev) => ({
	// 			...prev,
	// 			sampleType: value ? types[0]._id : 'none',
	// 		}));
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);
	return (
		<fieldset name='sample-types'>
			<h6>Sample Type</h6>
			<SelectInput
				name={name}
				options={types}
				value='id'
				defaultValue={value}
				none={none}
				onChange={(e) =>
					setHeader
						? setHeader((prev) => ({
								...prev,
								sampleType: e.target.value,
						  }))
						: null
				}
				defaultLanguage={languages[0].language}
				classes={classes}
			/>
		</fieldset>
	);
};

export default SampleType;
