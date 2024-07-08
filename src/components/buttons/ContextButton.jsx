'use client';
const ContextButton = ({ label = 'Click', onClick, type, classes = '' }) => {
	const types = {
		default: `hover:underline text-black ${classes}`,
		// edit: `bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-semibold py-[2.5px] px-4 rounded ${classes}`,
		edit: `bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-semibold pt-[1px] pb-[3px] px-5 rounded ${classes}`,
		delete: `bg-slate-400 hover:bg-slate-500 rounded py-[2.5px] px-4 `,
	};
	return (
		<button type='button' className={types[type]} onClick={onClick}>
			{label}
		</button>
	);
};

export default ContextButton;
