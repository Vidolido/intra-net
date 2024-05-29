import { rentVehicle } from '@/serverActions/vehicles';
import SubmitButton from '../buttons/SubmitButtons';
import VehicleError from '../errorComponents/VehicleError';

const VehiclePoolForm = ({ poolVehicles, users, locations }) => {
	return (
		<form action={rentVehicle} className='flex flex-col gap-4'>
			{poolVehicles.length === 0 ? (
				<p>There are no vehicles available.</p>
			) : (
				<select
					name='vehicleId'
					className='w-full min-w-[200px] self-end border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none cursor-pointer'>
					{poolVehicles.map((vehicle) => {
						return (
							<option key={vehicle._id} value={vehicle._id}>
								{vehicle.plates}
							</option>
						);
					})}
				</select>
			)}
			{poolVehicles.length === 0 ? (
				''
			) : (
				<>
					<select
						name='userId'
						className='w-full min-w-[200px] self-end border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none cursor-pointer'>
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
						className='w-full min-w-[200px] self-end border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none cursor-pointer'>
						{locations.map((location) => {
							return (
								<option key={location} value={location}>
									{location}
								</option>
							);
						})}
					</select>
					<VehicleError errorFrom='useVehicle' />

					<SubmitButton label='Use' element='userId' />
				</>
			)}
		</form>
	);
};

export default VehiclePoolForm;
