'use client';
import { useState } from 'react';

// components
import InputType from './InputType';

const LanguageInputContainer = ({
	label,
	name,
	selectName = '',
	languages,
}) => {
	const [language, setLanguage] = useState(languages[0]._id);
	const onSelectChange = (e) => {
		setLanguage(e.target.value);
	};

	console.log(language);
	return (
		<fieldset>
			<label>
				{label}
				{languages.map((lang) => {
					return (
						<InputType
							key={lang._id}
							type='text'
							name={`${name}-languages-${lang.language}`}
							classes={language === lang._id ? 'visible' : 'hidden'}
						/>
					);
				})}
			</label>
			<select
				name={selectName}
				className='w-[250px] self-end border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none cursor-pointer'
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
		</fieldset>
	);
};

export default LanguageInputContainer;
