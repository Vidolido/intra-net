'use client';

import { useEffect, useState } from 'react';

// helper
const languageInit = (languages, data) => {
	return languages.reduce((acc, lang) => {
		acc[lang.language] =
			data && data.state && data.state[lang.language]
				? data.state[lang.language]
				: '';
		return acc;
	}, {});
};

const LanguageInput = ({ languages, data = null, extractData }) => {
	let initState = languages.reduce((acc, lang) => {
		// if (lang.language in data.state) {
		if (data && data.state[lang.language]) {
			acc[lang.language] = data?.state[lang.language];
		} else acc[lang.language] = '';
		return acc;
	}, {});
	// initState = data?.state ? data?.state : initState;
	const [state, setState] = useState(initState);
	const [selectedLanguage, setSelectedLanguage] = useState(
		languages[0].language
	);

	const onBlurInput = () => {
		extractData(state);
	};

	const onInputChange = (e) => {
		setState((prev) => ({
			...prev,
			[selectedLanguage]: e.target.value,
		}));
	};

	const onSelectChange = (e) => {
		const { value } = e.target;
		setSelectedLanguage(value);
	};
	return (
		<fieldset>
			<input
				name={data.inputName}
				className='box-content border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none'
				type='text'
				value={state[selectedLanguage]}
				onChange={onInputChange}
				onBlur={onBlurInput}
			/>
			<select
				name={data.selectName || null}
				className='box-content border-[3px] border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none cursor-pointer'
				onChange={onSelectChange}
				defaultValue={selectedLanguage}>
				{languages.map((lang) => {
					return (
						<option key={lang._id} value={lang.language}>
							{lang.language}
						</option>
					);
				})}
			</select>
		</fieldset>
	);
};

export default LanguageInput;
