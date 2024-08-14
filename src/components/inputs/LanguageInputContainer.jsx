'use client';
import { useState } from 'react';

// components
import InputType from './InputType';

const LanguageInputContainer = ({
	fieldSetName = 'language-input',
	fieldSetClass = '',
	label = '',
	labelClass = '',
	name = '',
	selectName = '',
	languages,
	defaultLanguage,
	inputs = null,
	onChange = null,
}) => {
	const [language, setLanguage] = useState(defaultLanguage?._id);

	const onSelectChange = (e) => {
		setLanguage(e.target.value);
	};

	let mutInputs;
	if (Array.isArray(inputs)) {
		mutInputs = inputs;
	} else if (inputs !== null) {
		// let mutInputFields = languages.length
		mutInputs = Object.entries(inputs);
		// if(language.length !== mutInputs.length) {
		//   mutInputs = languages.reduce((acc, currentValue) => {

		//   } ,[])
		// }
	} else {
		mutInputs = null;
	}
	console.log(mutInputs, 'MUTINPUTS');
	return (
		<fieldset name={fieldSetName} className={fieldSetClass}>
			<label className={labelClass}>
				<span>{label}</span>
			</label>
			<div className='flex gap-[1px] justify-center items-start'>
				{mutInputs == null
					? languages?.map((lang) => {
							return (
								<InputType
									key={lang._id}
									type='text'
									name={name + lang.language}
									classes={language === lang._id ? 'visible' : 'hidden'}
									onChange={onChange}
								/>
							);
					  })
					: mutInputs?.map((input, index) => {
							const inputName = input[0] || Object.keys(input)[0] || '';

							const selectedLang = languages.filter(
								(lang) => lang._id === language
							)[0];
							const value = input[1] || Object.values(input)[1] || '';
							// console.log(input[0], input[1], 'OVIJA');
							// console.log(inputName, 'inputName');
							{
								/* console.log(value, 'OVOA'); */
							}
							return !onChange ? (
								<InputType
									key={index}
									type='text'
									name={name + inputName.toString()}
									classes={
										inputName && inputName.includes(selectedLang?.language)
											? 'visible'
											: 'hidden'
									}
									defaultValue={value}
								/>
							) : (
								<InputType
									key={index}
									type='text'
									name={name + inputName.toString()}
									classes={
										inputName.includes(selectedLang?.language)
											? 'visible'
											: 'hidden'
									}
									onChange={onChange}
									value={value}
								/>
							);
					  })}
				<select
					name={selectName}
					className='box-content border-[3px] border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none cursor-pointer'
					onChange={onSelectChange}
					value={language}>
					{languages.map((option) => {
						return (
							<option key={option._id} value={option._id}>
								{option.language}
							</option>
						);
					})}
				</select>
			</div>
		</fieldset>
	);
};

export default LanguageInputContainer;
