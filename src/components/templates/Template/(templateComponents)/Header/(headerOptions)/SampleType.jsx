'use client';
import { useEffect } from 'react';

// state/actions
import { filterTypes } from '@/utils/settings/filterTypes';
// import { findSettingType } from '@/utils/findSettingType';
// import { nameArray } from '@/utils/nameArray';

// components
import SelectInput from '@/components/reusable/SelectInput';
import { mutateForSelect } from '@/utils/templates/mutateForSelect';
// import SelectInput from '@/components/inputs/SelectInput';

const SampleType = ({
	types,
	defaultValue = null,
	showEmptyOption,
	languages,
	setHeader,
	classes,
}) => {
	const filteredSettings = filterTypes(types.settings, 'sample');

	let mutSettings = mutateForSelect(filteredSettings);
	// console.log(mutSettings, 'mutSettings');

	// console.log(sampleTypes(types.setting));

	// let sampleTypes = findSettingType(types.settings, ['sample']);
	// console.log(sampleTypes, 'sampleTypes');
	// let names = sampleTypes?.map((setting) => ({
	// 	_id: setting._id,
	// 	...nameArray(setting.parameter.inputValue),
	// }));

	useEffect(() => {
		if (setHeader)
			setHeader((prev) => ({
				...prev,
				sampleType: !defaultValue ? mutSettings[0]._id : defaultValue,
			}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<fieldset name='sample-types'>
			<h6>Sample Type</h6>
			<SelectInput
				defaultLanguage={languages[0].language}
				data={{
					state: mutSettings,
					showEmptyOption,
					selectName: 'sampleType',
					defaultValue: defaultValue && defaultValue,
					classes: 'flex flex-col items-start bg-white px-[2px] w-full',
				}}
				// extractData={handleSelection}
				// resetComponentData={resetComponentData}
				// setResetComponentData={setResetComponentData}
			/>
			{/* <SelectInput
				name={name}
				options={names}
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
			/> */}
		</fieldset>
	);
};

export default SampleType;
