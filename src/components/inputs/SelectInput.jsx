const SelectInput = ({ name, options, none = false, label, value }) => {
	return (
		<select
			name={name}
			className='w-[250px] self-end border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none cursor-pointer'>
			{none ? <option value='none'>--</option> : ''}
			{options.map((option, index) => {
				return (
					<option key={option.id || option._id || index} value={option[value]}>
						{option[label]}
					</option>
				);
			})}
		</select>
	);
};

export default SelectInput;
