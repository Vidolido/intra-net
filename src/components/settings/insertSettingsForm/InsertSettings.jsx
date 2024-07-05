'use client';
import { useEffect } from 'react';

// state/actions
import { ADD, ADD_TO_COLLECTION } from '@/state/actionTypes';
import {
	useSettingsContext,
	useSettingsDispatchContext,
} from '@/state/settingsContext';
import { addSetting } from '@/serverActions/settings/addSetting';
import { selectedInputType } from '@/utils/selectedInputType';
import { isObjectEmpty } from '@/utils/functions';
import { addItemsArray } from '@/utils/addItemsArray';

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
	const { defaultLanguage, inputType, selectedCollection, optionsSchema } =
		useSettingsContext();

	useEffect(() => {
		if (isObjectEmpty(optionsSchema)) {
			dispatch({
				type: ADD,
				payload: {
					type: 'add',
					state: 'optionsSchema',
					value: addItemsArray(setting.optionsSchema),
				},
			});
			// dispatch({
			// 	type: ADD,
			// 	payload: {
			// 		type: 'add',
			// 		state: 'optionsSchema',
			// 		value: setting.optionsSchema,
			// 	},
			// });
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let parameter =
		optionsSchema?.parameter?.name?.singular[defaultLanguage.language];

	let collections = optionsSchema?.collections || [];

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

	const handleButtonClick = async (e) => {
		let mainParam = e.target.form.elements
			.namedItem('main-parameter')
			.querySelectorAll('input');

		let optionsInput = e.target.form.elements
			.namedItem('collection-input-fields')
			.querySelectorAll('input');

		let main = Array.from(mainParam).reduce((acc, currentValue) => {
			let nameArray = currentValue.name.split('-');
			acc = {
				parameter: {
					name: optionsSchema.parameter.name,
					inputValue: {
						...acc[nameArray[1]]?.inputValue,
						...acc?.parameter?.inputValue,
						[nameArray[nameArray.length - 1]]: currentValue.value,
					},
				},
			};
			return acc;
		}, {});

		let selectedInput = selectedInputType(e, inputType);

		let pay = {
			state: 'optionsSchema',
			type: 'add',
			value: {
				...optionsSchema,
				...main,
			},
		};

		// }
		dispatch({
			type: ADD,
			payload: pay,
		});

		dispatch({
			type: ADD_TO_COLLECTION,
			payload: {
				state: 'optionsSchema',
				value: selectedInput,
				more: {
					property: 'collections',
					secondProp: 'items',
					selection: selectedCollection,
				},
			},
		});
		Array.from(optionsInput).map((item) => (item = item.value = ''));
	};

	const handleAddSetting = async (e) => {
		e.preventDefault();
		let settingToAdd = optionsSchema;
		await addSetting(settingToAdd, setting);
		console.log(addItemsArray(setting.optionsSchema), 'OVAAA');
		dispatch({
			type: ADD,
			payload: {
				type: 'add',
				state: 'optionsSchema',
				value: addItemsArray(setting.optionsSchema),
			},
		});
		dispatch({
			type: ADD,
			payload: {
				type: 'add',
				state: 'selectedCollection',
				value: 0,
			},
		});
		e.target.form.reset();
	};
	// console.log(state, 'the state');
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
							defaultLanguage='en'
							value={parameter && parameter}
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
					<CollectionInput
						languages={languages}
						inputType={inputType}
						name='collection-input-fields'
					/>
					<ContextButton
						label='Add to collection'
						type='edit'
						onClick={handleButtonClick}
					/>
				</fieldset>
				<div className='border border-slate-300 rounded p-1'>
					<h5>Items</h5>
					{optionsSchema ? (
						<DisplayCollections
							languages={languages}
							defaultLanguage={defaultLanguage}
						/>
					) : (
						''
					)}
				</div>
				<ContextButton
					label='Add Setting'
					type='edit'
					onClick={handleAddSetting}
				/>
			</div>
		</form>
	);
};

export default InsertSettings;
