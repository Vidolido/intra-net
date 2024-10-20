'use client';
import { useEffect } from 'react';

// state/actions
import { filterTypes } from '@/utils/settings/filterTypes';
import { mutateForSelect } from '@/utils/helpers/mutateForSelect';

// components
import SelectInput from '@/components/reusable/SelectInput';

const DocumentType = ({
	name,
	types,
	defaultValue = null,
	languages,
	value,
	setHeader,
	classes,
}) => {
	const filteredSettings = filterTypes(types.settings, 'document');

	let mutSettings = mutateForSelect(filteredSettings);

	useEffect(() => {
		if (setHeader)
			setHeader((prev) => ({
				...prev,
				documentType: mutSettings[0]?._id,
			}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<fieldset name='document-type'>
			<h6>Document Type</h6>
			<SelectInput
				defaultLanguage={languages[0].language}
				data={{
					state: mutSettings,
					selectName: 'documentType',
					defaultValue: !defaultValue ? mutSettings[0]._id : defaultValue,
					classes: 'flex flex-col items-start bg-white px-[2px] w-full',
				}}
			/>
		</fieldset>
	);
};

export default DocumentType;
