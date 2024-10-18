import { useEffect, useState } from 'react';

// helper
const initializeSelectState = (defaultLanguage, data) =>
	data.state.map(({ _id, name }) => ({
		...(_id && { _id }),
		value: name[defaultLanguage],
	}));

const SelectInput = ({
	defaultLanguage,
	data = null,
	extractData = null,
	showEmptyOption,
}) => {
	console.log(data, 'the data');
	const [state, setState] = useState(() =>
		initializeSelectState(defaultLanguage, data)
	);
	const [selected, setSelected] = useState(data.defaultValue || state[0]._id);

	useEffect(() => {
		const newState = initializeSelectState(defaultLanguage, data);
		setState(newState);
	}, [data, defaultLanguage]);

	const onSelectChange = (e) => {
		const { value } = e.target;
		setSelected(value);
		extractData !== null && extractData(state);
	};
	console.log(state, 'ovoa');
	return (
		<fieldset className={data?.classes}>
			<label>{data?.label}</label>
			<select
				name={data?.selectName}
				className={`box-content border border-grey-50 border-opacity-60 rounded hover:border-red-200 focus:outline-none cursor-pointer ${data?.classes}`}
				onChange={onSelectChange}
				value={selected}>
				{showEmptyOption && <option value=''>--</option>}
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
