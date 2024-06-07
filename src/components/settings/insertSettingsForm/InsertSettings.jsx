'use client';
import { useEffect } from 'react';

// state/actions
import {
	useSettingsContext,
	useSettingsDispatchContext,
} from '@/state/settingsContext';
import { ADD, ADD_TO_COLLECTION } from '@/state/actionTypes';
import { selectedInputType } from '@/utils/selectedInputType';
import { isObjectEmpty } from '@/utils/functions';

// components
import LanguageInputContainer from '@/components/inputs/LanguageInputContainer';
import SelectInput from '@/components/inputs/SelectInput';
import ContextButton from '@/components/buttons/ContextButton';
import RadioButtons from '../RadioButtons';
import CollectionInput from './CollectionInput';
import DisplayCollections from './DisplayCollections';

const InsertSettings = ({ languages, setting }) => {
	const state = useSettingsContext();
	const dispatch = useSettingsDispatchContext();
	const { defaultLanguage, inputType, selectedCollection } =
		useSettingsContext();
	const { optionsSchema } = setting;
	// console.log(setting, 'setting');
	// let parameter =
	// 	optionsSchema?.parameter?.name?.singular[defaultLanguage.language];
	let parameter =
		optionsSchema?.parameter?.name?.singular[defaultLanguage.language];

	let collections = optionsSchema?.collections || [];

	useEffect(() => {
		if (isObjectEmpty(state.optionsSchema)) {
			dispatch({
				type: ADD,
				payload: {
					type: 'add',
					state: 'optionsSchema',
					value: optionsSchema,
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [optionsSchema, state.optionsSchema]);

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
					name: optionsSchema.parameter.name,
					value: {
						...acc[nameArray[1]]?.value,
						[nameArray[nameArray.length - 1]]: currentValue.value,
					},
				},
			};
			return acc;
		}, {});
		// console.log(main, 'the main PARAM');

		let selectedInput = selectedInputType(e, inputType);

		// console.log(selectedInput, 'THE INPUT');
		let pay = {
			state: 'optionsSchema',
			type: 'add',
			value: {
				...optionsSchema,
				// ...main,
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
				state: 'optionsSchema',
				value: selectedInput,
				more: {
					property: 'items',
					secondProp: 'collection',
					selection: selectedCollection,
				},
			},
		});
	};

	const handleAddSetting = (e) => {
		e.preventDefault();
		let setting = optionsSchema;
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
	// console.log(setting, 'the setting inserSettings');
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
					{optionsSchema ? (
						<DisplayCollections
							languages={languages}
							defaultLanguage={defaultLanguage}
							setting={setting}
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
