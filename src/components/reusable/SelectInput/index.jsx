import { deepEqual } from '@/utils/helpers/deepEqual';
import { useEffect, useState } from 'react';

// helper
// const initializeSelectState = (defaultLanguage, data) =>
// 	data.state.map(({ _id, name }) => ({
// 		...(_id && { _id }),
// 		value: name[defaultLanguage],
// 	}));

const initializeSelectState = (
	defaultLanguage,
	data,
	showEmptyOption = null
) => {
	const stateArray = data.state.map(({ _id, name }) => ({
		_id,
		value: name[defaultLanguage],
	}));

	if (showEmptyOption) {
		stateArray.unshift({
			_id: '',
			value: '--',
		});
	}

	return stateArray;
};

const SelectInput = ({
	defaultLanguage,
	data,
	functions,
	extractData = null,
	reset = null,
	// resetComponentData = null,
	// setResetComponentData = null,
	// resetType = null,
}) => {
	const [state, setState] = useState(() =>
		initializeSelectState(defaultLanguage, data, data?.showEmptyOption)
	);

	const [selected, setSelected] = useState(data?.defaultValue || state[0]._id);

	// НЕ ГО БРИШИ ОВА ДА ВИДИМЕ КАДЕ ЌЕ ФАЛИ
	// useEffect(() => {
	// 	const newState = initializeSelectState(defaultLanguage, data);
	// 	setState(newState);
	// }, [data, defaultLanguage]);

	useEffect(() => {
		const newState = initializeSelectState(
			defaultLanguage,
			data,
			data?.showEmptyOption
		);
		if (!deepEqual(state, newState)) {
			setState(newState);
		}
	}, [defaultLanguage, state, data, data?.showEmptyOption]);

	useEffect(() => {
		if (reset && reset?.resetData && reset?.resetData[reset?.resetType]) {
			setSelected(state[0]._id);
			reset.setReset((prev) => ({
				...prev,
				[reset?.resetType]: false,
			}));
		}
	}, [reset, state]);

	const onSelectChange = (e) => {
		const { value, id, name } = e.target;
		setSelected(value);
		extractData !== null && extractData(value, { id, name });
	};

	// console.log(data, 'the data in SelectInput');

	return (
		<fieldset className={data?.classes}>
			<label>{data?.label}</label>
			<select
				id={data?.id}
				name={data?.selectName}
				className={`box-content border border-grey-50 border-opacity-60 rounded hover:border-red-200 focus:outline-none cursor-pointer ${data?.classes}`}
				onChange={onSelectChange}
				value={selected}>
				{state?.map((option, index) => (
					<option
						key={option.id || option._id || index}
						value={option.id || option._id || option.value}>
						{option.value}
					</option>
				))}
			</select>
		</fieldset>
	);
};

export default SelectInput;
