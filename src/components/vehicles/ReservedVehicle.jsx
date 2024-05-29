// server actions
import {
	confirmReservation,
	cancelReservation,
} from '@/serverActions/vehicles';

// components
import ActionButton from '../buttons/ActionButton';
import VehicleError from '../errorComponents/VehicleError';

const ReservedVehicle = ({ transactions }) => {
	return (
		<div>
			<h2 className='text-2xl font-semibold mb-4'>Reserved Vehicles</h2>
			<div>
				{transactions?.map((transaction) => {
					return (
						<div
							key={transaction._id}
							className='flex justify-between w-1/2 my-2'>
							<p>{transaction.vehicle.plates}</p>
							<p>{transaction.user}</p>
							<p>{transaction.location}</p>
							<p>{transaction.rentTime}</p>
							<p>{new Date(transaction.date).toLocaleTimeString()}</p>
							<ActionButton
								label='Confirm'
								action={confirmReservation}
								parameters={{
									transaction: transaction._id,
									vehicle: transaction.vehicle._id,
								}}
							/>
							<ActionButton
								label='Cancel'
								action={cancelReservation}
								parameters={transaction._id}
							/>
						</div>
					);
				})}
			</div>
			<VehicleError errorFrom='confirmReservation' />
		</div>
	);
};

export default ReservedVehicle;
