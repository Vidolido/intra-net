const LanguageInputField = ({ value, onChange, onBlur, inputName }) => {
	return (
		<input
			name={inputName}
			className='box-content border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none'
			type='text'
			value={value}
			onChange={onChange}
			onBlur={onBlur}
		/>
	);
};

export default LanguageInputField;
