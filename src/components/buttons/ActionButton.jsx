'use client';
import { useVehicleContext } from '@/state/vehicleContext';

const ActionButton = ({ label, action, parameters }) => {
	const { state, setState } = useVehicleContext();

	return (
		<button
			type='button'
			className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-semibold pt-[1px] pb-[3px] px-5 rounded'
			onClick={async () => {
				const { error } = await action(parameters);
				setState((prevState) => ({
					...prevState,
					error: { ...prevState.error, ...error },
				}));
				// console.log(error, 'THE ERROR');
			}}>
			{label}
		</button>
	);
};

export default ActionButton;
