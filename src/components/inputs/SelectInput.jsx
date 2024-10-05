const SelectInput = ({
	id,
	name,
	property = 'name',
	options,
	none = false,
	label,
	value,
	classes = '',
	onChange,
	defaultValue = '',
	defaultLanguage,
}) => {
	// console.log(options, 'THE  OPTIONS');
	return (
		<select
			id={id}
			name={name}
			className={`box-content border-2 border-grey-50 border-opacity-60 rounded hover:border-red-200 focus:outline-none cursor-pointer ${classes}`}
			onChange={onChange}
			defaultValue={defaultValue}>
			{/* {none || !options ? <option value='none'>--</option> : ''} */}
			{none || !options ? <option value=''>--</option> : ''}
			{options?.map((option, index) => {
				return (
					<option
						key={option.id || option._id || index}
						value={
							option.id ||
							option._id ||
							option[value] ||
							option[property][defaultLanguage]
						}>
						{option[label] ||
							option[property][defaultLanguage] ||
							option[value]}
					</option>
				);
			})}
		</select>
	);
};

export default SelectInput;
