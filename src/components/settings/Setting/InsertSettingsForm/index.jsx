'use client';
import { useState } from 'react';

// state/actions
import { insertSettings } from '@/data-access/settings/insertSettings';
import { isObjectEmpty } from '@/utils/helpers/isObjectEmpty';

// components
import RadioButtons from './RadioButtons';
import CollectionInput from './CollectionInput';
import DisplayCollections from './DisplayCollections';
// import SelectInput from '@/components/inputs/SelectInput';
import ContextButton from '@/components/buttons/ContextButton';
import LanguageInput from '@/components/reusable/LanguageInput';
import SelectInput from '@/components/reusable/SelectInput';

const InsertSettingsForm = ({ setting, languages }) => {
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
	const [actionStatus, setActionStatus] = useState({
		error: null,
		success: null,
	});
	const [error, setError] = useState({});

	// const [selectedCollection, setSelectedCollection] = useState(
	// 	!collections[0] ? '' : collections[0]._id
	// );
	const [selectedCollection, setSelectedCollection] = useState(
		!collections[0] ? '' : collections[0]._id
	);
	const [inputType, setInputType] = useState('simple');

	const handleMainParam = (data) => {
		setState((prev) => ({ ...prev, parameter: data }));
	};

	// const hanldeMainParameterChange = (e) => {
	// 	let lang = e.target.name.split('-');
	// 	lang = lang[lang.length - 1];

	// 	setState((prev) => ({
	// 		...prev,
	// 		parameter: {
	// 			[lang]: e.target.value,
	// 		},
	// 	}));
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
	// };
	const handleChangeInputType = (e) => {
		setInputType(e.target.value);
	};

	const handleSelection = (data) => {
		setSelectedCollection(data);
	};

	const handleSubmit = async (e) => {
		let areCollectionsEmpty = Object.values(state.collections).every(
			(coll) => coll.length === 0
		);

		let isEmpty = isObjectEmpty(state.parameter);

		if (isEmpty) {
			setActionStatus({
				error: { mainParameter: "This field can't be empty." },
				success: null,
			});
		} else if (areCollectionsEmpty) {
			setActionStatus({
				error: { collectionInput: 'Enter a value' },
				success: null,
			});
		} else {
			const { error, success } = await insertSettings(state, setting._id);
			setActionStatus({
				error: error || null,
				success: success || null,
			});
			setInputType('simple');
			setState(initialState);
		}
	};
	return (
		<form className='border border-slate-200 rounded p-1'>
			<LanguageInput
				languages={languages}
				data={{
					state: state.parameter,
					label: parameter,
					labelClass: 'block',
					inputName: 'main-parameter',
					name: 'main-parameter',
				}}
				extractData={handleMainParam}
			/>

			<span
				className={`bg-red-100 text-red-700 ${
					actionStatus?.error?.mainParameter ? 'visible' : 'hidden'
				}`}
				role='alert'>
				{actionStatus?.error?.mainParameter}
			</span>
			<div className='flex gap-2'>
				<fieldset className='flex flex-col min-w-[200px]'>
					<label>Collection</label>
					<SelectInput
						defaultLanguage={languages[0].language}
						data={{
							state: collections,
							defaultValue: selectedCollection,
							classes: 'flex flex-col items-start bg-white px-[2px] w-full',
						}}
						extractData={handleSelection}
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
				actionStatus={actionStatus}
				setActionStatus={setActionStatus}
			/>
			<span
				className={`bg-red-100 text-red-700 ${
					actionStatus?.error?.collectionInput ? 'visible' : 'hidden'
				}`}
				role='alert'>
				{actionStatus?.error?.collectionInput}
			</span>
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
