'use client';
import { useEffect } from 'react';

// components
import SelectInput from '@/components/inputs/SelectInput';

const DocumentType = ({
	name,
	types,
	languages,
	value,
	none,
	setHeader,
	classes,
}) => {
	// let documentTypes = findSettingType(types.settings, ['document']);
	// let names = documentTypes?.map((setting) => ({
	// 	id: setting._id,
	// 	...nameArray(setting.parameter.inputValue),
	// }));

	// useEffect(() => {
	// 	if (setHeader)
	// 		setHeader((prev) => ({
	// 			...prev,
	// 			documentType: types[0]._id,
	// 		}));
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	return (
		<fieldset name='document-type'>
			<h6>DocumentType</h6>
			<SelectInput
				name={name}
				options={types}
				value='id'
				none={none}
				defaultValue={value}
				onChange={(e) =>
					setHeader
						? setHeader((prev) => ({
								...prev,
								documentType: e.target.value,
						  }))
						: null
				}
				defaultLanguage={languages[0].language}
				classes={classes}
			/>
		</fieldset>
	);
};

export default DocumentType;
