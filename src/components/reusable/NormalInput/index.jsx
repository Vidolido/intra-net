import { useEffect, useState } from 'react';

const NormalInput = ({
	data = null,
	type = 'default',
	extractData = null,
	resetComponentData = null,
	setResetComponentData = null,
}) => {
	const [value, setValue] = useState(data?.state || '');

	const typeClass = {
		default:
			'box-content border border-grey-50 border-opacity-60 rounded hover:border-red-200 focus:outline-none',
	};

	useEffect(() => {
		if (resetComponentData) {
			setValue('');
			setResetComponentData && setResetComponentData(false);
		}
	}, [resetComponentData, setResetComponentData]);

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
