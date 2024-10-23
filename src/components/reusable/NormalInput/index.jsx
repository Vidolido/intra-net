import { useEffect, useState } from 'react';

const NormalInput = ({
	data = null,
	type = 'default',
	extractData = null,
	reset = null,
}) => {
	const [value, setValue] = useState(data?.state != null ? data?.state : '');

	const typeClass = {
		default:
			'box-content border border-grey-50 border-opacity-60 rounded hover:border-red-200 focus:outline-none',
	};

	useEffect(() => {
		let resetData =
			reset && reset?.resetData
				? Object.values(reset?.resetData).some((value) => value === true)
				: false; // ova prvo beshe true
		if (resetData) {
			setValue('');
			let newResetData =
				reset?.setReset &&
				Object.entries(reset?.resetData).reduce((acc, currentValue) => {
					acc[currentValue[0]] = false;
					return acc;
				}, {});

			reset?.setReset && reset?.setReset(newResetData);
		}
	}, [reset]);

	const handleInputChange = (e) => {
		let { value } = e?.target;
		setValue(value || '');
	};

	const handleBlur = (e) => {
		extractData != null &&
			extractData(value, {
				id: e.target.id,
				name: e.target.name,
				type: e.target.type,
			});
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
				// defaultValue={data?.defaultValue || ''}
				required={data?.required || false}
				className={`${typeClass[type]} ${data?.inputClass}`}
			/>
		</fieldset>
	);
};

export default NormalInput;
