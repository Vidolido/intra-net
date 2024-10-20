'use client';
import { useEffect } from 'react';

// state/actions
import { mutateForSelect } from '@/utils/helpers/mutateForSelect';

// components
import SelectInput from '@/components/reusable/SelectInput';

const Origin = ({
	name,
	countries,
	defaultValue = null,
	languages,
	showEmptyOption,
	value,
	setHeader,
	classes,
}) => {
	let { settings } = countries;
	let mutSettings = mutateForSelect(settings);

	useEffect(() => {
		if (setHeader) {
			setHeader((prev) => ({
				...prev,
				origin: mutSettings[0]._id,
			}));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<fieldset name='countries-of-origin'>
			<h6>Origin</h6>
			<SelectInput
				defaultLanguage={languages[0].language}
				data={{
					state: mutSettings,
					showEmptyOption,
					selectName: 'origin',
					defaultValue: defaultValue && defaultValue,
					classes: 'flex flex-col items-start bg-white px-[2px] w-full',
				}}
				// extractData={handleSelection}
				// resetComponentData={resetComponentData}
				// setResetComponentData={setResetComponentData}
			/>
		</fieldset>
	);
};

export default Origin;
