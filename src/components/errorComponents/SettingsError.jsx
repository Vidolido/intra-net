'use client';

import { useErrorContext } from '@/state/ErrorContext';

const SettingError = ({ errorFrom }) => {
	const { error } = useErrorContext();

	const isError =
		error?.error[errorFrom] !== undefined && error?.error[errorFrom].length > 0;
	return (
		<div className={`bg-red-100 p-1 rounded ${!isError ? 'hidden' : ''}`}>
			<span className='text-red-700 font-semibold'>
				{error.error[errorFrom]}
			</span>
		</div>
	);
};

export default SettingError;
