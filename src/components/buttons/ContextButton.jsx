'use client';
const ContextButton = ({ label = 'Click', onClick }) => {
	return (
		<button
			type='button'
			className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-semibold pt-[1px] pb-[3px] px-5 rounded'
			onClick={onClick}>
			{label}
		</button>
	);
};

export default ContextButton;
