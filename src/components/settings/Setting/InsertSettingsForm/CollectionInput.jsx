'use client';
import { useState } from 'react';

// state/actions
import { generateUUID } from '@/utils/generateUUID';

// components
import ContextButton from '@/components/buttons/ContextButton';
import NormalInput from '@/components/reusable/NormalInput';
import LanguageInput from '@/components/reusable/LanguageInput';

let types = (
	languages,
	value,
	onChange,
	resetComponentData,
	setResetComponentData
) => ({
	simple: (
		<NormalInput
			data={{
				state: value,
				name: 'simple',
				fieldsetClass: 'flex flex-col grow bg-white px-[2px]',
				inputClass: 'h-21px',
			}}
			extractData={onChange}
			// resetComponentData={resetComponentData}
			// setResetComponentData={setResetComponentData}
		/>
	),
	translations: (
		<>
			<LanguageInput
				languages={languages}
				data={{
					defaultLanguage: languages[0].language,
					state: value,
					labelClass: 'block',
					inputName: 'translations',
				}}
				extractData={onChange}
				resetLanguage={resetComponentData}
				setResetLanguage={setResetComponentData}
			/>
		</>
	),
	'key/value': (
		<>
			<NormalInput
				data={{
					state: value,
					name: 'key',
					fieldsetClass: 'flex flex-col grow bg-white px-[2px]',
					inputClass: 'h-21px',
				}}
				extractData={onChange}
				resetComponentData={resetComponentData}
				setResetComponentData={setResetComponentData}
			/>
			<NormalInput
				data={{
					state: value,
					name: 'value',
					fieldsetClass: 'flex flex-col grow bg-white px-[2px]',
					inputClass: 'h-21px',
				}}
				extractData={onChange}
				resetComponentData={resetComponentData}
				setResetComponentData={setResetComponentData}
			/>
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
	resetComponentData,
	setResetComponentData,

	buttonLabel,
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
			setResetComponentData(true);
			setInput(null);
		}
	};

	const handleChange = (data, dataObj) => {
		let name = dataObj?.name;
		let value = data;
		if (inputType === dataObj?.name) {
			setInput(value);
		}
		if (inputType === dataObj?.name) {
			setInput(value);
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
			{
				types(
					languages,
					input,
					handleChange,
					resetComponentData,
					setResetComponentData
				)[inputType]
			}
			<ContextButton label={buttonLabel} type='edit' onClick={handleAdd} />
		</fieldset>
	);
};

export default CollectionInput;
