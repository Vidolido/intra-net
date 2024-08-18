const InputType = ({
	id,
	type = 'text',
	name,
	defaultValue = null,
	classes,
	value,
	onChange = null,
	onBlur = null,
	required = false,
}) => {
	return !defaultValue ? (
		<input
			id={id}
			type={type}
			name={name}
			onChange={onChange}
			onBlur={onBlur}
			value={value}
			required={required}
			className={`box-content border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none ${classes}`}
		/>
	) : (
		<input
			id={id}
			type={type}
			name={name}
			defaultValue={defaultValue}
			required={required}
			className={`box-content border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none ${classes}`}
		/>
	);
};

export default InputType;
