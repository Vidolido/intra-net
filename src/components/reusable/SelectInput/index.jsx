import { useEffect, useState } from 'react';

// helper
const initializeSelectState = (defaultLanguage, data) =>
	data.state.map(({ _id, name }) => ({
		...(_id && { _id }),
		value: name[defaultLanguage],
	}));

const SelectInput = ({
	defaultLanguage,
	data,
	extractData = null,
	showEmptyOption,
	resetComponentData,
	setResetComponentData,
}) => {
	const [state, setState] = useState(() =>
		initializeSelectState(defaultLanguage, data)
	);

	const [selected, setSelected] = useState(data?.defaultValue || state[0]._id);

	useEffect(() => {
		const newState = initializeSelectState(defaultLanguage, data);
		setState(newState);
	}, [data, defaultLanguage]);

	useEffect(() => {
		if (resetComponentData) {
			setSelected(state[0]._id);
			setResetComponentData(false);
		}
	}, [resetComponentData, setResetComponentData, state]);

	const onSelectChange = (e) => {
		const { value } = e.target;
		setSelected(value);
		// extractData !== null && extractData(state);
		extractData !== null && extractData(value);
	};
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
