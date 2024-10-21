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
	reset
	// resetComponentData,
	// setResetComponentData
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
			resetComponentData={reset?.resetData}
			setResetComponentData={reset?.setReset}
			resetType={reset?.type}
		/>
	),
	translations: (
		<LanguageInput
			languages={languages}
			data={{
				defaultLanguage: languages[0].language,
				state: value,
				labelClass: 'block',
				inputName: 'translations',
			}}
			extractData={onChange}
			resetLanguage={reset?.resetData}
			setResetLanguage={reset?.setReset}
			resetType={reset?.type}
		/>
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
				resetComponentData={reset.resetData}
				setResetComponentData={reset.setReset}
				resetType={reset.type}
			/>
			<NormalInput
				data={{
					state: value,
					name: 'value',
					fieldsetClass: 'flex flex-col grow bg-white px-[2px]',
					inputClass: 'h-21px',
				}}
				extractData={onChange}
				resetComponentData={reset.resetData}
				setResetComponentData={reset.setReset}
				resetType={reset.type}
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
	reset,
	// resetComponentData,
	// setResetComponentData,
	buttonLabel,
}) => {
	const [input, setInput] = useState(null);

	const handleAdd = () => {
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
			let collections = state?.collections ? { ...state.collections } : {};
			let collectionToInsert = collections[selectedCollection]
				? [...collections[selectedCollection]]
				: [];

			let payload = {
				id: generateUUID(),
				inputType,
				value: input,
			};
			collectionToInsert.push(payload);
			collections[selectedCollection] = collectionToInsert;
			setState((prev) => ({ ...prev, collections }));
			// setResetComponentData((prev) => ({
			// 	...prev,
			// 	add: true,
			// }));
			reset.setReset({
				submit: false,
				add: true,
				collections: false,
			});
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
	// console.log(state.collections, 'the state.collections');
	return (
		<fieldset className='flex items-start gap-2' name='collection-input'>
			{types(languages, input, handleChange, reset)[inputType]}
			<ContextButton label={buttonLabel} type='edit' onClick={handleAdd} />
		</fieldset>
	);
};

export default CollectionInput;
