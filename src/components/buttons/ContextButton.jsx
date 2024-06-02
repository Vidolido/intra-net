'use client';
const ContextButton = ({ label = 'Click', onClick, classes = '' }) => {
	return (
		<button
			type='button'
			className={`${classes} bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-semibold py-[2.5px] px-4 rounded`}
			onClick={onClick}>
			{label}
		</button>
	);
};

export default ContextButton;
