'use client';
import LanguageInputContainer from '@/components/inputs/LanguageInputContainer';
import { nameArray } from '@/utils/nameArray';
import { useEffect, useMemo, useState } from 'react';

const EditMain = ({ languages, parameter }) => {
	const defaultLanguage = {
		_id: '6656eed3b12adae590481cfe',
		language: 'en',
		locale: 'en-US',
	};

	const [checkedName, setCheckedName] = useState('singular');
	let [inputs, setInputs] = useState([]);
	let checkBoxFields = Object.keys(parameter?.name).reduce(
		(acc, currentValue) => {
			acc.push(currentValue);
			return acc;
		},
		[]
	);
	useEffect(() => {
		let names = parameter.name[checkedName];
	}, [checkedName]);

	// useEffect(() => {
	// 	setInputs(
	// 		Object.entries(parameter.name[checkedName]).reduce(
	// 			(acc, currentValue) => {
	// 				acc.push({ [currentValue[0]]: currentValue[1] });
	// 				// acc[currentValue[0]] = currentValue[1];
	// 				return acc;
	// 			},
	// 			[]
	// 		)
	// 	);
	// }, [checkedName]);
	// console.log(checkedName, 'checkedName');
	let test = useMemo(
		() =>
			Object.entries(parameter.name[checkedName]).reduce(
				(acc, currentValue) => {
					acc.push({ [currentValue[0]]: currentValue[1] });
					// acc[currentValue[0]] = currentValue[1];
					return acc;
				},
				[]
			),
		[checkedName, parameter]
	);

	const handleRadioButton = (e, field) => {
		// console.log(e, field, 'ovie dve');
		setCheckedName(e.target.value);
	};
	// let names = products?.settings.map((setting) => ({
	// 	id: setting._id,
	// 	...nameArray(setting.parameter.inputValue),
	// }));
	console.log(test, 'THE TEST');
	return (
		<fieldset>
			<div>
				{checkBoxFields.map((field) => (
					<label key={field}>
						<input
							type='radio'
							name='name'
							checked={checkedName === field ? 'checked' : ''}
							value={field}
							onChange={(e) => handleRadioButton(e, field)}
						/>{' '}
						<span>{field}</span>
					</label>
				))}
				<LanguageInputContainer
					label='name'
					inputs={test}
					languages={languages}
					defaultLanguage={defaultLanguage}
				/>
			</div>
			<label htmlFor=''>
				<span>{parameter.inputValue['en']}</span>
				<input type='text' />
			</label>
		</fieldset>
	);
};

export default EditMain;
