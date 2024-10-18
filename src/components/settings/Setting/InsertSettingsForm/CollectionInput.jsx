'use client';
import { useState } from 'react';

// state/actions
import { generateUUID } from '@/utils/generateUUID';

// components
import ContextButton from '@/components/buttons/ContextButton';
import InputType from '@/components/inputs/InputType';
import LanguageInputContainer from '@/components/inputs/LanguageInputContainer';

let types = (languages, value, onChange) => ({
	simple: <InputType type='text' name='simple' onChange={onChange} />,
	translations: (
		<LanguageInputContainer
			languages={languages}
			defaultLanguage={languages[0]}
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
	state,
	setState,
	setActionStatus,
}) => {
	const [input, setInput] = useState(null);

	const handleAdd = (e) => {
		if (!input) {
			setActionStatus({
				error: { collectionInput: 'Add a value.' },
				success: null,
			});
		} else {
			setActionStatus({
				error: null,
				success: {
					collectionInput: 'Successfuly added.',
				},
			});
			let collections = state?.collections || [];

			let collectionToInsert = collections[selectedCollection];

			let payload = {
				id: generateUUID(),
				inputType,
				value: input,
			};
			collectionToInsert.push(payload);

			setState((prev) => ({ ...prev, collections }));

			let inputItems = e.target.form.elements
				.namedItem('collection-input')
				.querySelectorAll('input');

			setInput(null);
			Array.from(inputItems).map((item) => (item.value = ''));
		}
	};
	// console.log(state, 'voa e stejto');

	const handleChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		if (inputType === 'simple') {
			setInput(value);
		}
		if (inputType === 'translations') {
			setInput((prev) => ({
				...prev,
				[name]: value,
			}));
		}
		if (inputType === 'key/value') {
			setInput((prevState) => ({
				...prevState,
				[name]: value,
			}));
		}
	};
	return (
		<fieldset className='flex items-start gap-2' name='collection-input'>
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
