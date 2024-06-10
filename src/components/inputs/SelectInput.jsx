const SelectInput = ({
	// name = {},
	property = 'name',
	options,
	none = false,
	label,
	value,
	classes,
	onChange,
	defaultValue = '',
	defaultLanguage,
}) => {
	// console.log(options, 'THE  OPTIONS');
	return (
		<select
			className={`min-w-[200px] box-content border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none cursor-pointer ${classes}`}
			onChange={onChange}
			defaultValue={defaultValue}>
			{none || !options ? <option value='none'>--</option> : ''}
			{options?.map((option, index) => {
				return (
					<option key={option.id || option._id || index} value={option[value]}>
						{/* {option[label] || option[value] || option?.name[label]} */}
						{/* {option[label] || option[value] || option?.name[defaultLanguage]} */}
						{option[label] ||
							option[value] ||
							option[property][defaultLanguage]}
						{/* {option[label] || option[value]} */}
					</option>
				);
			})}
		</select>
	);
};

export default SelectInput;
