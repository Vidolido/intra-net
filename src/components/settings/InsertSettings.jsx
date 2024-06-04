'use client';

// state/actions
import {
	useSettingsContext,
	useSettingsDispatchContext,
} from '@/state/settingsContext';
import { ADD, ADD_TO_COLLECTION } from '@/state/actionTypes';
import { selectedInputType } from '@/utils/selectedInputType';

// components
import LanguageInputContainer from '../inputs/LanguageInputContainer';
import SelectInput from '../inputs/SelectInput';
import RadioButtons from './RadioButtons';
import CollectionInput from './CollectionInput';
import ContextButton from '../buttons/ContextButton';
import DisplayCollections from './DisplayCollections';

const InsertSettings = ({ languages }) => {
	const state = useSettingsContext();
	const dispatch = useSettingsDispatchContext();
	const { optionSchema, defaultLanguage, inputType, selectedCollection } =
		useSettingsContext();

	let parameter =
		optionSchema?.parameter?.name?.singular[defaultLanguage.language];
	let collections = optionSchema?.collections || [];

	const handleRadioChange = (e) => {
		dispatch({
			type: ADD,
			payload: {
				type: 'add',
				state: 'inputType',
				value: e.target.value,
			},
		});
	};

	const handleOnSelect = (e) => {
		let selection = e.target.value;
		let indexArray = collections.map((item) =>
			Object.entries(item.name).findIndex((obj) => obj[1] === selection)
		);
		let index = indexArray.findIndex((ind) => ind === 0);

		dispatch({
			type: ADD,
			payload: {
				type: 'add',
				state: 'selectedCollection',
				value: index,
			},
		});
	};

	const handleButtonClick = (e) => {
		let mainParam = e.target.form.elements
			.namedItem('main-parameter')
			.querySelectorAll('input');

		let main = Array.from(mainParam).reduce((acc, currentValue) => {
			let nameArray = currentValue.name.split('-');
			acc = {
				parameter: {
					name: optionSchema.parameter.name,
					value: {
						...acc[nameArray[1]]?.value,
						[nameArray[nameArray.length - 1]]: currentValue.value,
					},
				},
			};
			return acc;
		}, {});
		console.log(main, 'the main PARAM');

		let selectedInput = selectedInputType(e, inputType);

		// console.log(selectedInput, 'THE INPUT');
		let pay = {
			state: 'optionSchema',
			type: 'add',
			value: {
				...optionSchema,
				...main,
			},
		};

		dispatch({
			type: ADD,
			payload: pay,
		});

		dispatch({
			type: ADD_TO_COLLECTION,
			payload: {
				// type: 'push',
				state: 'optionSchema',
				value: selectedInput,
				more: {
					property: 'collections',
					secondProp: 'collection',
					selection: selectedCollection,
				},
			},
		});
	};

	const handleAddSetting = (e) => {
		e.preventDefault();
		let setting = optionSchema;
		// let settingsCollection = settings;

		// settingsCollection.push(setting);

		dispatch({
			type: ADD_TO_COLLECTION,
			payload: {
				type: 'push',
				state: 'settings',
				value: setting,
			},
		});
	};

	console.log(state);

	return (
		<form className='border border-slate-200 rounded p-1'>
			<fieldset name='main-parameter'>
				{!parameter ? (
					''
				) : (
					<LanguageInputContainer
						label={!parameter ? 'Parameter name' : parameter}
						fieldSetClass='flex flex-col items-start'
						name='main-parameter'
						languages={languages}
						defaultLanguage={defaultLanguage}
					/>
				)}
			</fieldset>
			<div className='flex flex-col gap-1'>
				<div className='flex gap-2'>
					<fieldset className='flex flex-col min-w-[200px]'>
						<label>Collection</label>

						<SelectInput
							name='collection-select'
							options={collections}
							label={defaultLanguage.language}
							value={parameter && parameter[defaultLanguage.language]}
							onChange={handleOnSelect}
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
							onChange={handleRadioChange}
						/>
					</fieldset>
				</div>
				<div className='bg-slate-200 w-[95%] h-[1px] mx-auto my-[2px]'></div>

				<fieldset className='flex gap-2'>
					<CollectionInput languages={languages} inputType={inputType} />
					<ContextButton
						label='Add to collection'
						onClick={handleButtonClick}
					/>
				</fieldset>
				<div className='border border-slate-300 rounded p-1'>
					<h5>Items</h5>
					{optionSchema ? (
						<DisplayCollections
							languages={languages}
							defaultLanguage={defaultLanguage}
						/>
					) : (
						''
					)}
				</div>
				<ContextButton label='Add Setting' onClick={handleAddSetting} />
			</div>
		</form>
	);
};

export default InsertSettings;
