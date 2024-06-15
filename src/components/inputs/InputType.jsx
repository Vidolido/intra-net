const InputType = ({
	type,
	name,
	defaultValue = null,
	classes,
	value,
	onChange = null,
}) => {
	return !defaultValue ? (
		<input
			type={type}
			name={name}
			onChange={onChange}
			value={value}
			className={`min-w-[200px] box-content border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none ${classes}`}
		/>
	) : (
		<input
			type={type}
			name={name}
			defaultValue={defaultValue}
			onChange={onChange}
			value={value}
			className={`min-w-[200px] box-content border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none ${classes}`}
		/>
	);
};

export default InputType;
