const LanguageSelector = ({ languages, selectedLanguage, onSelectChange }) => {
	return (
		<select
			className='box-content border border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none cursor-pointer h-[22px]'
			onChange={onSelectChange}
			value={selectedLanguage}>
			{languages.map((lang) => (
				<option key={lang._id} value={lang.language}>
					{lang.language}
				</option>
			))}
		</select>
	);
};

export default LanguageSelector;
