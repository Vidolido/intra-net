const LanguageInputField = ({ id, value, onChange, onBlur, inputName }) => {
	return (
		<input
			id={id}
			name={inputName}
			className='box-content border border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none h-[22px] mr-1'
			type='text'
			value={value}
			onChange={onChange}
			onBlur={onBlur}
		/>
	);
};

export default LanguageInputField;
