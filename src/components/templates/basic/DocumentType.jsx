'use client';
import { useEffect } from 'react';

// state/actions
import { findSettingType } from '@/utils/findSettingType';
import { nameArray } from '@/utils/nameArray';

// components
import SelectInput from '@/components/inputs/SelectInput';

const DocumentType = ({ name, types, setHeader, classes }) => {
	let documentTypes = findSettingType(types.settings, ['document']);
	let names = documentTypes?.map((setting) => ({
		id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));

	useEffect(() => {
		if (setHeader)
			setHeader((prev) => ({
				...prev,
				documentType: names[0].id,
			}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<fieldset name='document-type'>
			<h6>DocumentType</h6>
			<SelectInput
				name={name}
				options={names}
				value='id'
				onChange={(e) =>
					setHeader
						? setHeader((prev) => ({
								...prev,
								documentType: e.target.value,
						  }))
						: null
				}
				defaultLanguage='en'
				classes={classes}
			/>
		</fieldset>
	);
};

export default DocumentType;
