'use client';
import { useState } from 'react';

// components
import LanguageInputContainer from '@/components/inputs/LanguageInputContainer';
import SelectInput from '@/components/inputs/SelectInput';
import RadioButtons from './RadioButtons';
import CollectionInput from './CollectionInput';

const InsertSettingsForm = ({ setting, languages }) => {
	let [inputType, setInputType] = useState('simple');
	let [selectedCollection, setSelectedCollection] = useState({});
	let [collectionInput, setCollectionInput] = useState([]);

	let parameter =
		setting?.optionsSchema?.parameter?.name?.singular[languages[0].language];
	let collections = setting?.optionsSchema?.collections;
	// console.log(parameter, 'the parameter');

	const handleSelection = (e) => {
		// console.log(e.target.value);
		setSelectedCollection(e.target.value);
	};
	return (
		<form className='border border-slate-200 rounded p-1'>
			<LanguageInputContainer
				label={!parameter ? 'Parameter name' : parameter}
				fieldSetClass='flex flex-col items-start'
				name='main-parameter'
				languages={languages}
				defaultLanguage={languages[0]}
			/>
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
						onChange={(e) => setInputType(e.target.value)}
					/>
				</fieldset>
			</div>
			<CollectionInput
				languages={languages}
				inputType={inputType}
				selectedCollection={selectedCollection}
				collectionInput={collectionInput}
				setCollectionInput={setCollectionInput}
			/>
		</form>
	);
};

export default InsertSettingsForm;
