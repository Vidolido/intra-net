'use client';

const DateInput = ({ date }) => {
	const handleOnChange = (e) => {
		console.log(e.target);
	};

	return (
		<input
			type='date'
			name='registrationLast'
			onChange={handleOnChange}
			defaultValue={date}
			className='border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none'
		/>
	);
};

export default DateInput;
