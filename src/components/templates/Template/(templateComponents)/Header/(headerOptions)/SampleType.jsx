'use client';
import { useEffect } from 'react';

// state/actions
import { filterTypes } from '@/utils/settings/filterTypes';
import { mutateForSelect } from '@/utils/helpers/mutateForSelect';

// components
import SelectInput from '@/components/reusable/SelectInput';

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
			/>
		</fieldset>
	);
};

export default SampleType;
