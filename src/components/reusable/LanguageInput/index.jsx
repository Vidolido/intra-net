'use client';
import { useEffect, useState } from 'react';

// state/actions
import { deepEqual } from '@/utils/helpers/deepEqual';

//compponents
import LanguageInputField from './LanguageInputField';
import LanguageSelector from './LanguageSelector';

// helper
const initializeState = (languages, data) => {
	return languages.reduce((acc, lang) => {
		acc[lang.language] = data && data[lang.language] ? data[lang.language] : '';
		return acc;
	}, {});
};

const LanguageInput = ({
	languages,
	data = null,
	extractData,
	reset = null,
}) => {
	const [state, setState] = useState(() =>
		initializeState(languages, data.state)
	);
	const [selectedLanguage, setSelectedLanguage] = useState(
		languages[0].language
	);

	useEffect(() => {
		let resetData =
			reset && reset.resetData
				? Object.values(reset.resetData).some((value) => value === true)
				: false;
		if (resetData) {
			// setState(() => initializeState(languages, data.state));
			let newResetData =
				reset.setReset &&
				Object.entries(reset.resetData).reduce((acc, currentValue) => {
					acc[currentValue[0]] = false;
					return acc;
				}, {});

			reset.setReset && reset.setReset(newResetData);
		}
	}, [reset, languages, data]);

	useEffect(() => {
		const newState = initializeState(languages, data.state);
		if (!deepEqual(state, newState)) {
			setState(newState);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data.state]);

	const onBlurInput = (e) => {
		extractData &&
			extractData(state, { id: e?.target?.id, name: e?.target?.name });
	};

	const onInputChange = (e) => {
		setState((prev) => ({
			...prev,
			[selectedLanguage]: e.target.value,
		}));
	};

	const onSelectChange = (e) => setSelectedLanguage(e.target.value);

	return (
		<fieldset name={data?.fieldSetName} className={`${data?.fieldSetClass}`}>
			<label className={data?.labelClass}>{data?.label}</label>
			<div>
				<LanguageInputField
					id={data?.id}
					value={state[selectedLanguage]}
					onChange={onInputChange}
					onBlur={onBlurInput}
					inputName={data?.inputName}
				/>
				<LanguageSelector
					languages={languages}
					selectedLanguage={selectedLanguage}
					onSelectChange={onSelectChange}
				/>
			</div>
		</fieldset>
	);
};

export default LanguageInput;
