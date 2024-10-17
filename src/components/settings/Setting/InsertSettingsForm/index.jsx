'use client';
import { useEffect, useState } from 'react';

// state/actions
// import { insertSettings } from '@/data-access/settings/insertSettings';
import { isObjectEmpty } from '@/utils/helpers/isObjectEmpty';

// components
import RadioButtons from './RadioButtons';
import CollectionInput from './CollectionInput';
import DisplayCollections from './DisplayCollections';
import SelectInput from '@/components/inputs/SelectInput';
// import LanguageInput from '@/components/reusable/LanguageInput';
// import LanguageInputContainer from '@/components/inputs/LanguageInputContainer';
import ContextButton from '@/components/buttons/ContextButton';
import LanguageInput from '@/components/reusable/LanguageInput';
import { insertSettings } from '@/data-access/settings/insertSettings';
// import LanguageInput from '@/components/reusable/LanguageInput';

const InsertSettingsForm = ({ setting, languages }) => {
	console.log(setting, 'first setting');
	let parameter =
		setting?.optionsSchema?.parameter?.name?.singular[languages[0].language];

	let collections = setting?.optionsSchema?.collections;

	const initialState = {
		parameter: {},
		collections: {
			...collections.reduce((acc, curentValue) => {
				acc[curentValue._id] = [];
				return acc;
			}, {}),
		},
	};

	const [state, setState] = useState(initialState);
	const [error, setError] = useState({});

	// const [selectedCollection, setSelectedCollection] = useState(
	// 	!collections[0] ? '' : collections[0]._id
	// );
	const [selectedCollection, setSelectedCollection] = useState(
		!collections[0] ? '' : collections[0]._id
	);
	const [inputType, setInputType] = useState('simple');

	const handleMainParam = (data) => {
		// console.log(data, 'the data');
		setState((prev) => ({ ...prev, parameter: data }));
	};

	const hanldeMainParameterChange = (e) => {
		let lang = e.target.name.split('-');
		lang = lang[lang.length - 1];

		setState((prev) => ({
			...prev,
			parameter: {
				[lang]: e.target.value,
			},
		}));
		// setState((prev) => ({
		//   ...prev,
		//   parameter: {
		//     ...prev.parameter,
		//     inputValue: {
		//       ...prev?.parameter?.inputValue,
		//       [lang]: e.target.value,
		//     },
		//   },
		// }));
	};
	const handleChangeInputType = (e) => {
		setInputType(e.target.value);
	};

	const handleSelection = (e) => {
		console.log(e.target.value);
		setSelectedCollection(e.target.value);
	};

	const handleSubmit = async (e) => {
		// console.log(Object.values(state.collections));
		let areCollectionsEmpty = Object.values(state.collections).every(
			(coll) => coll.length === 0
		);
		let isEmpty = isObjectEmpty(state.parameter);
		// console.log(parameter, 'parameter');
		// console.log(isEmpty, 'isEmpty');
		// console.log(isObjectEmpty(parameter), 'parameter');
		// console.log(areCollectionsEmpty, 'areCollectionsEmpty');
		if (isEmpty) {
			setError((prev) => ({
				...prev,
				mainParameter: 'Fill all fields',
			}));
		} else if (areCollectionsEmpty) {
			setError((prev) => ({
				...prev,
				collectionInput: 'Please enter a value',
			}));
		} else {
			await insertSettings(state, setting._id);

			// let mainParam = e.target.form.elements
			// 	.namedItem('main-parameter-inputs')
			// 	.querySelectorAll('input');
			// let mainParam = e.target.form.elements.namedItem('main-parameter');
			let inputItems = e.target.form.elements
				.namedItem('collection-input')
				.querySelectorAll('input');
			// console.log(mainParam, 'mainPARAM');
			// mainParam.value = '';
			// Array.from(mainParam).forEach((item) => (item.value = ''));
			Array.from(inputItems).forEach((item) => (item.value = ''));
			setInputType('simple');
			setError({});
			setState(initialState);
		}
	};

	console.log(state, 'the state');

	return (
		<form className='border border-slate-200 rounded p-1'>
			<LanguageInput
				languages={languages}
				data={{
					state: state.parameter,
					inputName: 'main-parameter',
					name: 'main-parameter',
				}}
				extractData={handleMainParam}
			/>
			{/* <LanguageInputContainer
				label={!parameter ? 'Parameter name' : parameter}
				fieldSetName='main-parameter-inputs'
				fieldSetClass='flex flex-col items-start'
				name='parameter-'
				languages={languages}
				defaultLanguage={languages[0]}
				onChange={hanldeMainParameterChange}
			/> */}
			<p>{error.mainParameter}</p>
			<div className='flex gap-2'>
				<fieldset className='flex flex-col min-w-[200px]'>
					<label>Collection</label>

					<SelectInput
						name='collection-select'
						options={collections}
						defaultLanguage='en'
						value={parameter && parameter}
						onChange={handleSelection}
					/>
				</fieldset>
				<fieldset className='flex flex-col'>
					<label>Input Type</label>
					<RadioButtons
						divClasses='flex gap-1 w-full'
						labelClasses={`flex flex-col items-center border border-slate-200 rounded hover:bg-red-500 hover:text-white cursor-pointer px-3 py-[2px]`}
						inputClasses='hidden'
						labels={['Simple', 'Translations', 'key/value']}
						name='inputType'
						inputType={inputType}
						onChange={handleChangeInputType}
					/>
				</fieldset>
			</div>
			<CollectionInput
				languages={languages}
				inputType={inputType}
				selectedCollection={selectedCollection}
				state={state}
				setState={setState}
				setError={setError}
				buttonLabel='Add to collection'
			/>
			<p>{error.collectionInput}</p>
			<div className='border border-slate-300 rounded p-1'>
				<h5>Items</h5>
				<DisplayCollections
					languages={languages}
					state={state}
					setState={setState}
					selectedCollection={selectedCollection}
				/>
			</div>
			<ContextButton
				label='Add Setting'
				type='edit'
				classes='w-full'
				onClick={handleSubmit}
			/>
		</form>
	);
};

export default InsertSettingsForm;
