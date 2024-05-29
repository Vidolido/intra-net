const InputType = ({ type, name, defaultValue = '', classes }) => {
	return (
		<input
			type={type}
			name={name}
			defaultValue={defaultValue}
			className={`border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none ${classes}`}
		/>
	);
};

export default InputType;
