import { useEffect, useState } from 'react';

const NormalInput = ({
	data = null,
	type = 'default',
	extractData = null,
	resetComponentData = null,
	setResetComponentData = null,
	resetType = null,
}) => {
	const [value, setValue] = useState(data?.state || '');

	const typeClass = {
		default:
			'box-content border border-grey-50 border-opacity-60 rounded hover:border-red-200 focus:outline-none',
	};

	useEffect(() => {
		let resetData = resetComponentData
			? Object.values(resetComponentData).some((value) => value === true)
			: true;
		if (resetData) {
			setValue('');
			let newResetData =
				setResetComponentData &&
				Object.entries(resetComponentData).reduce((acc, currentValue) => {
					acc[currentValue[0]] = false;
					return acc;
				}, {});

			setResetComponentData && setResetComponentData(newResetData);
		}
	}, [resetComponentData, setResetComponentData, resetType]);

	const handleInputChange = (e) => {
		setValue(e.target.value);
	};

	const handleBlur = (e) => {
		extractData != null &&
			extractData(value, { id: e.target.id, name: e.target.name });
	};

	return (
		<fieldset className={data?.fieldsetClass || ''}>
			<label>{data?.label}</label>
			<input
				id={data?._id}
				type={data?.type}
				name={data?.name}
				value={value}
				onChange={handleInputChange}
				onBlur={handleBlur}
				defaultValue={data?.defaultValue}
				required={data?.required || false}
				className={`${typeClass[type]} ${data?.inputClass}`}
			/>
		</fieldset>
	);
};

export default NormalInput;
