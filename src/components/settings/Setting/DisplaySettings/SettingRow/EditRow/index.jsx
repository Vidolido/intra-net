'use client';
import { useState } from 'react';

// state/actions
import { editSetting } from '@/data-access/settings/editSetting';
import { isObjectEmpty } from '@/utils/helpers/isObjectEmpty';

// components
import LanguageInput from '@/components/reusable/LanguageInput';
import SelectInput from '@/components/reusable/SelectInput';
import ErrorMsg from '@/components/reusable/ErrorMsg';
import RadioButtons from '../../../InsertSettingsForm/RadioButtons';
import CollectionInput from '../../../InsertSettingsForm/CollectionInput';
import DisplayCollections from '../../../InsertSettingsForm/DisplayCollections';
import ContextButton from '@/components/buttons/ContextButton';

const EditRow = ({
	languages,
	documentId,
	optionsSchema,
	setting,
	numberOfCollections,
	classes,
}) => {
	const parameter =
		optionsSchema?.parameter?.name?.singular[languages[0].language];
	const collections = optionsSchema?.collections;

	const [state, setState] = useState({
		parameter: setting?.parameter,
		collections: setting?.collections,
	});

	const [selectedCollection, setSelectedCollection] = useState(
		Object.keys(state.collections)[0]
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

	const handleSubmit = async () => {
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
			const { error, success } = await editSetting(
				documentId,
				setting._id,
				state
			);
			setActionStatus({
				error: error || null,
				success: success || null,
			});
			setInputType('simple');
			setState({
				parameter: setting?.parameter,
				collections: setting?.collections,
			});
			// setResetLanguage(true);
			setResetComponentData(true);
		}
	};

	return (
		<form
			className='border border-slate-200 bg-slate-100 rounded p-1 min-h-[200px]'
			style={{ gridColumn: `span ${optionsSchema.collections.length + 1}` }}>
			<div className='flex gap-2'>
				<div>
					<LanguageInput
						languages={languages}
						data={{
							defaultLanguage: languages[0].language,
							state: setting?.parameter,
							label: parameter,
							labelClass: 'block',
							inputName: 'main-parameter',
							name: 'main-parameter',
						}}
						extractData={handleMainParam}
						// resetLanguage={resetLanguage}
						// setResetLanguage={setResetLanguage}
					/>
				</div>
				{actionStatus?.error?.mainParameter && (
					<ErrorMsg msg={actionStatus?.error?.mainParameter} />
				)}
				<div>
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
						buttonLabel='Add'
					/>
					{actionStatus?.error?.collectionInput && (
						<ErrorMsg msg={actionStatus?.error?.collectionInput} />
					)}
					<div className='border border-slate-300 rounded p-1'>
						<h5>Items</h5>
						<DisplayCollections
							languages={languages}
							setting={setting}
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
