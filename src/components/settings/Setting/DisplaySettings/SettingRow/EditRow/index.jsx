'use client';
import { useEffect, useState } from 'react';

import InputType from '@/components/inputs/InputType';
import LanguageInputContainer from '@/components/inputs/LanguageInputContainer';
import SelectInput from '@/components/inputs/SelectInput';
import RadioButtons from '../../../InsertSettingsForm/RadioButtons';
import CollectionInput from '../../../InsertSettingsForm/CollectionInput';
import DisplayCollections from '../../../InsertSettingsForm/DisplayCollections';
import ContextButton from '@/components/buttons/ContextButton';

const EditRow = ({
	languages,
	documentId,
	setting,
	numberOfCollections,
	classes,
}) => {
	// const parameter = setting.parameter;
	// const collections = setting.collections;
	const defaultLanguage = languages[0];

	const [state, setState] = useState({
		parameter: setting.parameter,
		collections: setting.collections,
	});
	const [error, setError] = useState({});

	const [selectedCollection, setSelectedCollection] = useState(
		state.collections[0]._id
	);
	const [inputType, setInputType] = useState('simple');

	const handleChangeInputType = (e) => {
		setInputType(e.target.value);
	};

	const handleSelection = (e) => {
		setSelectedCollection(e.target.value);
	};

	return (
		<form className='border border-slate-200 bg-slate-100 rounded p-1 col-span-4 flex gap-2 min-h-[200px]'>
			<div className='w-[50%]'>
				<LanguageInputContainer
					fieldSetName='main-parameter-inputs'
					fieldSetClass='flex flex-col w-full'
					label={
						!state?.parameter?.name?.singular[defaultLanguage.language]
							? 'Parameter name'
							: state?.parameter?.name?.singular[defaultLanguage.language]
					}
					inputClases='w-full'
					name='parameter-'
					languages={languages}
					defaultLanguage={languages[0]}
					inputs={state?.parameter?.inputValue}
					// onChange={hanldeMainParameterChange}
				/>
			</div>
			{/* <p>{error.mainParameter}</p> */}
			<div className='gap-2 w-[50%]'>
				<fieldset className='flex flex-col min-w-[200px]'>
					<label>Collection</label>

					<SelectInput
						name='collection-select'
						options={state?.collections}
						defaultLanguage='en'
						defaultValue={selectedCollection}
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
				<CollectionInput
					languages={languages}
					inputType={inputType}
					selectedCollection={selectedCollection}
					state={state}
					setState={setState}
					setError={setError}
					buttonLabel='Add'
				/>
				{/* <p>{error.collectionInput}</p> */}
				<div className='border border-slate-300 rounded p-1'>
					<h5>Items</h5>
					<DisplayCollections
						languages={languages}
						state={state}
						setState={setState}
						selectedCollection={selectedCollection}
					/>
				</div>
			</div>
			{/* <ContextButton
				label='Add Setting'
				type='edit'
				classes='w-full'
				onClick={handleSubmit}
			/> */}
		</form>
	);
};

export default EditRow;
// <form
//   className={`grid col-span-4 h-[200px]`}
//   style={{ gridTemplateColumns }}>
//   <div className='flex'>
//     <LanguageInputContainer fieldSetClass='w-fit' languages={languages} />
//   </div>
//   <div className='w-fif'>
//     <InputType classes='w-fit' />
//   </div>
//   <div className='w-fif'>
//     <InputType />
//   </div>
//   <div className='w-fif'>
//     <InputType />
//   </div>
// </form>
