'use client';
import { useState } from 'react';

// state/actions
import { useSettingsContext } from '@/state/settingsContext';
import { addSettings } from '@/utils/addSettings';

// components
import InputType from '../inputs/InputType';
import LanguageInputContainer from '../inputs/LanguageInputContainer';
import SelectInput from '../inputs/SelectInput';
import RadioButtons from './RadioButtons';
import CollectionInput from './CollectionInput';
import ContextButton from '../buttons/ContextButton';
import DisplayCollections from './DisplayCollections';

const InsertSettings = ({ languages }) => {
	const { state, setState } = useSettingsContext();
	const { optionSchema, defaultLanguage, inputType, selectedCollection } =
		state;

	let parameter =
		optionSchema?.parameter?.name?.singular[defaultLanguage.language];
	let collections = optionSchema?.collections || [];

	const handleRadioChange = (e) => {
		setState((prevState) => ({
			...prevState,
			inputType: e.target.value,
		}));
	};

	const handleOnSelect = (e) => {
		let selection = e.target.value;
		let indexArray = collections.map((item) =>
			Object.entries(item.name).findIndex((obj) => obj[1] === selection)
		);
		let index = indexArray.findIndex((ind) => ind === 0);

		setState((prevState) => ({
			...prevState,
			selectedCollection: index,
		}));
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

		let selectedInputType = (inputType) => {
			switch (inputType) {
				case 'simple': {
					let simpleInput =
						e.target.form.elements.namedItem('collection-input');
					return {
						inputType,
						value: simpleInput.value,
					};
				}
				case 'translations': {
					let inputs = e.target.form?.elements
						.namedItem('collection-language-inputs')
						.querySelectorAll('input');

					let translationInputs = Array.from(inputs).reduce(
						(acc, currentValue) => {
							let nameArray = currentValue.name.split('-');
							let lang = nameArray[nameArray.length - 1];
							acc = {
								...acc,
								[lang]: currentValue.value,
							};
							return acc;
						},
						{}
					);

					return {
						inputType: 'translations',
						value: translationInputs,
					};
				}
				case 'key/value': {
					let keyValueInput = e.target.form.elements
						.namedItem('collection-input-fields')
						.querySelectorAll('input');

					let key = Array.from(keyValueInput).filter(
						(input) => input.name === 'key'
					)[0];
					let value = Array.from(keyValueInput).filter(
						(input) => input.name === 'value'
					)[0];

					return {
						inputType: 'key/value',
						value: {
							key: key.value,
							value: value.value,
						},
					};
				}
				default: {
					return 'default';
				}
			}
		};

		const payload = selectedInputType(inputType);

		let selected = state.optionSchema.collections;
		selected[selectedCollection].collection.push(payload);

		setState((prevState) => ({
			...prevState,
			optionSchema: {
				...prevState.optionSchema,
				...main,
				collections: [...selected],
			},
		}));
	};

	const handleAddSetting = (e) => {
		e.preventDefault();
		let setting = state.optionSchema;

		console.log(setting);
		let settings = state.settings;
		settings.push(setting);
		setState((prevState) => ({
			...prevState,
			settings: [...settings],
		}));
	};

	// console.log(state, 'THE STATE');
	return (
		<form>
			<fieldset name='main-parameter'>
				<label>{!parameter ? 'Parameter name' : parameter}</label>

				{!parameter ? (
					''
				) : (
					<LanguageInputContainer
						name='main-parameter'
						languages={languages}
						defaultLanguage={defaultLanguage}
					/>
				)}
			</fieldset>
			<div>
				<fieldset>
					<label>Select a collection to populate</label>

					<SelectInput
						name='collection-select'
						options={collections}
						label={defaultLanguage.language}
						value={parameter && parameter[defaultLanguage.language]}
						onChange={handleOnSelect}
					/>
				</fieldset>
				<fieldset>
					<label>Input Type</label>
					<RadioButtons
						labels={['Simple', 'Translations', 'key/value']}
						name='inputType'
						onChange={handleRadioChange}
					/>
				</fieldset>
				<fieldset>
					<CollectionInput languages={languages} inputType={inputType} />
				</fieldset>
				<ContextButton label='Add to collection' onClick={handleButtonClick} />
				<div>
					<h5>Items</h5>
					{optionSchema ? <DisplayCollections languages={languages} /> : ''}
				</div>
				<ContextButton label='Add Setting' onClick={handleAddSetting} />
			</div>
		</form>
	);
};

export default InsertSettings;
