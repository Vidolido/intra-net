'use client';
import { useEffect, useState } from 'react';

// import InputType from '@/components/inputs/InputType';
import LanguageInputContainer from '@/components/inputs/LanguageInputContainer';
import SelectInput from '@/components/inputs/SelectInput';
import RadioButtons from '../../../InsertSettingsForm/RadioButtons';
import CollectionInput from '../../../InsertSettingsForm/CollectionInput';
import DisplayCollections from '../../../InsertSettingsForm/DisplayCollections';
import ContextButton from '@/components/buttons/ContextButton';
import { editSetting } from '@/data-access/settings/editSetting';
import LanguageInput from '@/components/reusable/LanguageInput';

const EditRow = ({
	languages,
	documentId,
	optionsSchema,
	setting,
	numberOfCollections,
	classes,
}) => {
	// const parameter = setting.parameter;
	// const collections = setting.collections;
	const defaultLanguage = languages[0];

	const [test, setTest] = useState(null);

	const [state, setState] = useState({
		parameter: setting?.parameter,
		collections: setting?.collections,
	});
	const [error, setError] = useState({});

	const [selectedCollection, setSelectedCollection] = useState(
		Object.keys(state.collections)[0]
	);
	const [inputType, setInputType] = useState('simple');

	const handleChangeInputType = (e) => {
		setInputType(e.target.value);
	};

	const handleSelection = (e) => {
		setSelectedCollection(e.target.value);
	};

	const handleSubmit = async () => {
		await editSetting(documentId, setting._id, state);
	};

	const handleTest = async (data) => {
		console.log(data, 'the data in handleTest');
	};
	// const handleExtract = (data) => {
	// 	setState((prev) => ({
	// 		...prev,
	// 		parameter,
	// 	}));
	// };
	console.log(state, 'THE TESTINGAT THE MOMENT');
	return (
		<form
			className='border border-slate-200 bg-slate-100 rounded p-1 min-h-[200px]'
			style={{ gridColumn: `span ${optionsSchema.collections.length + 1}` }}>
			<div className='flex gap-2'>
				<div className='w-[50%]'>
					<LanguageInput
						languages={languages}
						data={{ state: state?.parameter }}
						extractData={handleTest}
					/>
					{/* <LanguageInputContainer
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
					/> */}
				</div>
				{/* <p>{error.mainParameter}</p> */}
				<div className='gap-2 w-[50%]'>
					<fieldset className='flex flex-col min-w-[200px]'>
						<label>Collection</label>

						{/* <select
							className={`box-content border-2 border-grey-50 border-opacity-60 rounded hover:border-red-200 focus:outline-none cursor-pointer`}>
							{optionsSchema.collections.map((collection, index) => (
								<option key={collection._id} value={collection._id}>
									{collection.name}
								</option>
							))}
						</select> */}

						<SelectInput
							name='collection-select'
							options={optionsSchema.collections}
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
			</div>

			<ContextButton
				label='Save Setting'
				type='edit'
				classes='w-full'
				onClick={handleSubmit}
			/>
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
