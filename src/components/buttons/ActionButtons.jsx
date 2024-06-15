'use client';
import { useErrorContext } from '@/state/ErrorContext';

const ActionButtons = ({ label, action, parameters, classes }) => {
	const { setError } = useErrorContext();

	const types = {
		default: `hover:underline text-black ${classes}`,
		edit: `bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-semibold py-[2.5px] px-4 rounded ${classes}`,
		delete: `bg-slate-400 hover:bg-slate-500 rounded py-[2.5px] px-4 `,
	};

	return (
		<button
			type='button'
			onClick={async () => {
				const { error = null } = await action(parameters);
				if (error) {
					setError((prevState) => ({
						...prevState,
						error: { ...prevState.error, ...error },
					}));
				}
				// setError((prevState) => {
				//   if (error) {
				//     return {
				//       ...prevState,
				//       error,
				//     };
				//   } else return {};
				// });
				// console.log(error, 'THE ERROR');
			}}>
			{label}
		</button>
	);
};

export default ActionButtons;
