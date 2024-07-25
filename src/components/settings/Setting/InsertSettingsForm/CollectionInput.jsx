'use client';
import ContextButton from '@/components/buttons/ContextButton';
import InputType from '@/components/inputs/InputType';
import LanguageInputContainer from '@/components/inputs/LanguageInputContainer';
import { useState } from 'react';

let types = (languages, value, onChange) => ({
	simple: <InputType type='text' name='collection-input' onChange={onChange} />,
	translations: (
		<LanguageInputContainer
			languages={languages}
			defaultLanguage={languages[0]}
			fieldSetName='collection-language-inputs'
			onChange={onChange}
		/>
	),
	'key/value': (
		<>
			<InputType type='text' name='key' onChange={onChange} />
			<InputType type='text' name='value' onChange={onChange} />
		</>
	),
});

const CollectionInput = ({
	languages,
	inputType,
	selectedCollection,
	collectionInput,
	setCollectionInput,
}) => {
	const [input, setInput] = useState('');

	const handleAdd = (e) => {
		console.log(e);

		// setCollectionInput((prev) => ({
		// 	...prev,
		// 	[selectedCollection]: [],
		// }));
	};

	const handleChange = (e) => {
		console.log(e.target.value);
		setInput(e.target.value);
	};
	return (
		<fieldset className='flex items-start gap-2'>
			{types(languages, null, handleChange)[inputType]}
			<ContextButton
				label='Add to collection'
				type='edit'
				onClick={handleAdd}
			/>
		</fieldset>
	);
};

export default CollectionInput;
