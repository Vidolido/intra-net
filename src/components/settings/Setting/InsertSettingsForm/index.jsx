'use client';
import { useState } from 'react';

// state/actions
import { insertSettings } from '@/data-access/settings/insertSettings';
import { isObjectEmpty } from '@/utils/helpers/isObjectEmpty';

// components
import RadioButtons from './RadioButtons';
import CollectionInput from './CollectionInput';
import DisplayCollections from './DisplayCollections';
import ContextButton from '@/components/buttons/ContextButton';
import LanguageInput from '@/components/reusable/LanguageInput';
import SelectInput from '@/components/reusable/SelectInput';
import ErrorMsg from '@/components/reusable/ErrorMsg';

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
	const [selectedCollection, setSelectedCollection] = useState(
		!collections[0] ? '' : collections[0]._id
	);
	const [actionStatus, setActionStatus] = useState({
		error: null,
		success: null,
	});
	const [inputType, setInputType] = useState('simple');
	const [resetLanguage, setResetLanguage] = useState(false);
	const [resetComponentData, setResetComponentData] = useState(false);

	const handleMainParam = (data) => {
		setState((prev) => ({ ...prev, parameter: data }));
	};

	const handleChangeInputType = (e) => {
		setInputType(e.target.value);
		setResetComponentData(true);
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
			// setResetLanguage((prev) => !prev);
			setResetLanguage(true);
			// setResetComponentData((prev) => !prev);
			setResetComponentData(true);
		}
	};
	return (
		<form className='border border-slate-200 rounded p-1'>
			<LanguageInput
				languages={languages}
				data={{
					defaultLanguage: languages[0].language,
					state: state?.parameter,
					label: parameter,
					labelClass: 'block',
					inputName: 'main-parameter',
					name: 'main-parameter',
				}}
				extractData={handleMainParam}
				resetLanguage={resetLanguage}
				setResetLanguage={setResetLanguage}
			/>

			{actionStatus?.error?.mainParameter && (
				<ErrorMsg msg={actionStatus?.error?.mainParameter} />
			)}

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
						resetComponentData={resetComponentData}
						setResetComponentData={setResetComponentData}
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
				resetComponentData={resetComponentData}
				setResetComponentData={setResetComponentData}
				buttonLabel='Add to collection'
			/>

			{actionStatus?.error?.collectionInput && (
				<ErrorMsg msg={actionStatus?.error?.collectionInput} />
			)}

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
