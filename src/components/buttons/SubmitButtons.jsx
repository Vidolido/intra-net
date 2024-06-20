'use client';
import { useEffect } from 'react';
import { useFormStatus } from 'react-dom';

// state/actions
import { ADD } from '@/state/actionTypes';
import { useSettingsDispatchContext } from '@/state/settingsContext';
import { useVehicleContext } from '@/state/vehicleContext';
import {
	checkIfUserRented,
	getTransactionsByDate,
} from '@/serverActions/vehicles';

const SubmitButton = ({ label, element }) => {
	const { pending } = useFormStatus();

	const { state, setState } = useVehicleContext();
	const dispatch = useSettingsDispatchContext();

	useEffect(() => {
		setState({
			error: {},
			profile: {
				transactions: [],
			},
		});
	}, [element, setState]);

	const handleClick = async (e) => {
		e.preventDefault();
		const checkValue = e.target.form.elements?.namedItem(element)
			? e.target.form.elements?.namedItem(element)
			: null;

		if (label === 'Use Schema') {
			dispatch({
				type: ADD,
				payload: {
					type: 'add',
					state: 'showOptionsSchema',
					value: false,
				},
			});
			e.target.form.requestSubmit();
			return;
		}

		if (checkValue === null) {
			setState((prevState) => {
				return { ...prevState, error: {} };
			});
			e.target.form.requestSubmit();
			return;
		}
		if (checkValue.name === 'userId') {
			e.preventDefault();
			if (checkValue.value === 'none') {
				setState((prevState) => {
					if (label === 'Reserve') {
						return {
							...prevState,
							error: {
								...prevState.error,
								reservationError: 'Please select a user.',
							},
						};
					} else {
						return {
							...prevState,
							error: {
								...prevState.error,
								useVehicle: 'Please select a user.',
							},
						};
					}
				});
				return;
			}

			// Ова да го поправам
			const hasUserRented = await checkIfUserRented(checkValue.value);

			if (hasUserRented) {
				setState((prevState) => ({
					...prevState,
					error: {
						...prevState.error,
						reservationError: 'You have already requested a vehicle for use.',
					},
				}));
				return;
			} else {
				e.target.form.requestSubmit();
				setState((prevState) => ({
					...prevState,
					error: { ...prevState.error, reservationError: '' },
				}));
				return;
			}
		}

		if (checkValue.name === 'from') {
			e.preventDefault();
			const from = e.target.form.elements?.namedItem('from').value;
			if (from === '') {
				setState((prevState) => {
					return {
						...prevState,
						error: {
							profileTransactions: 'Please enter a date.',
						},
						profile: {
							transactions: [],
						},
					};
				});
				return;
			}
			const to = e.target.form.elements?.namedItem('to').value;
			const transactions = JSON.parse(await getTransactionsByDate(from, to));
			setState((prevState) => {
				return {
					...prevState,
					error: {
						profileTransactions: '',
					},
					profile: {
						transactions,
					},
				};
			});
		}
	};
	return (
		<button
			className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-semibold pt-[1px] pb-[3px] px-5 rounded'
			type='submit'
			aria-disabled={pending}
			onClick={handleClick}
			disabled={pending && 'disabled'}>
			{label}
		</button>
	);
};

export default SubmitButton;
