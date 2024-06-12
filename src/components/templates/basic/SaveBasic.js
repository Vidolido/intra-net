'use client';

import { useErrorContext } from '@/state/ErrorContext';

const SaveBasic = () => {
	const { error, setError } = useErrorContext();
	console.log(error, 'the error in the button');
	return (
		<button
			type='button'
			onClick={async () => {
				const { error } = await makeDraftTemplate(parameters);
				setError((prevState) => ({
					...prevState,
					error: { ...prevState.error, ...error },
				}));
			}}>
			Save
		</button>
	);
};

export default SaveBasic;
