// state/actions
import { makeReservation } from '@/serverActions/vehicles';

// components
import VehicleError from '../errorComponents/VehicleError';
import SubmitButton from '../buttons/SubmitButtons';

const hours = [
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
	22, 23,
];
const minutes = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

const ReservationForm = ({ vehicles, users, locations }) => {
	return (
		<form action={makeReservation} className='flex flex-col gap-4'>
			<select
				name='vehicleId'
				className='w-[250px] self-end border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none cursor-pointer'>
				{vehicles.map((vehicle) => {
					return (
						<option key={vehicle._id} value={vehicle._id}>
							{vehicle.plates}
						</option>
					);
				})}
			</select>
			<select
				name='userId'
				className='w-[250px] self-end border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none cursor-pointer'>
				<option value='none'>--</option>
				{users.map((user) => {
					return (
						<option key={user.id} value={user.name}>
							{user.name}
						</option>
					);
				})}
			</select>
			<select
				name='location'
				className='w-[250px] self-end border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none cursor-pointer'>
				{locations.map((location) => {
					return (
						<option key={location} value={location}>
							{location}
						</option>
					);
				})}
			</select>
			<fieldset>
				<label>
					Hours
					<select
						name='hour'
						className='border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none cursor-pointer'>
						{hours.map((hour) => {
							return (
								<option key={hour} value={hour}>
									{hour}
								</option>
							);
						})}
					</select>
				</label>
				<label>
					Minutes
					<select
						name='minutes'
						className='border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none cursor-pointer'>
						{minutes.map((minute) => {
							return (
								<option key={minute} value={minute}>
									{minute}
								</option>
							);
						})}
					</select>
				</label>
			</fieldset>
			{/* <ReservationError /> */}
			<VehicleError errorFrom='reservationError' />
			<SubmitButton label={'Reserve'} element={'userId'} />
		</form>
	);
};

export default ReservationForm;
