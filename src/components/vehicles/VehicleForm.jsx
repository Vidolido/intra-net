// state/actions
import { addNewVehicle } from '@/serverActions/vehicles';

// components
import DateInput from '../Inputs/DateInput';

const VehicleForm = ({ vehicle }) => {
	return (
		<form action={addNewVehicle} className='w-[720px] mx-auto'>
			<div className='my-5'>
				<h3>Basic Vehicle Info</h3>
				<label className='flex flex-col'>
					<span className='text-right'>Vehicle User</span>
					<select
						name='user'
						className='w-[250px] self-end border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none cursor-pointer'
						defaultValue={vehicle ? vehicle?.user : 'Select a user'}>
						<option value='none'>--</option>
						<option value='Boshko Boshkovski'>Boshko Boshkovski</option>
						<option value='Vane Vanevski'>Vane Vanevski</option>
						<option value='Risto Ristovski'>Risto Ristovski</option>
					</select>
				</label>

				<div className='flex gap-2 w-full'>
					<label className='flex flex-col'>
						<span>Plates</span>
						<input
							type='text'
							name='plates'
							defaultValue={vehicle ? vehicle?.plates : 'Choose a vehicle'}
							className='border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none uppercase'
						/>
					</label>
					<label className='flex flex-col'>
						<span>Color</span>
						<select
							name='color'
							className='border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none cursor-pointer'
							defaultValue={vehicle ? vehicle?.color : 'Choose a color'}>
							<option value='white'>White</option>
							<option value='gray'>Gray</option>
							<option value='black'>Black</option>
						</select>
					</label>
					<label className='flex flex-col'>
						<span>Equipment</span>
						<input
							type='text'
							name='equipment'
							defaultValue={vehicle ? vehicle?.equipment : ''}
							className='border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none'
						/>
					</label>
					<label className='flex flex-col'>
						<span>Insurance</span>
						<input
							type='text'
							name='insurance'
							defaultValue={vehicle ? vehicle?.insurance : ''}
							className='border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none'
						/>
					</label>
				</div>

				<div className='flex gap-10'>
					<label className='flex flex-col'>
						<span>Vehicle Type</span>
						<select
							name='vehicleType'
							className='border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none cursor-pointer'
							defaultValue={
								vehicle ? vehicle?.vehicleType : 'Choose a vehicle type'
							}>
							<option value='private'>Private</option>
							<option value='vehiclePool'>Vehicle Pool</option>
							<option value='oilMovement'>Oil Movement</option>
						</select>
					</label>
					<label className='flex flex-col'>
						<span>In Use</span>
						<input
							type='checkbox'
							name='inUse'
							defaultChecked={vehicle ? vehicle?.inUse : false}
							className='border-2 border-grey-50 border-opacity-60 rounded hover:border-red-200 focus:outline-none m-1'
						/>
					</label>
				</div>
			</div>
			<div>
				<h3>Registration and Service</h3>
				<fieldset>
					<h3>Registration</h3>

					<div className='flex gap-2'>
						<label className='flex flex-col'>
							<span>Last</span>

							<DateInput
								date={vehicle ? vehicle?.registration?.next?.split('T')[0] : ''}
							/>
						</label>
						<label className='flex flex-col'>
							<span>Next</span>
							<input
								type='date'
								name='registrationNext'
								defaultValue={
									vehicle && vehicle?.registration?.next !== null
										? vehicle?.registration?.next.split('T')[0]
										: ''
								}
								className='border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none'
							/>
						</label>
					</div>
				</fieldset>
				<fieldset>
					<h3>Service</h3>
					<fieldset>
						<h4>Small</h4>
						<div className='flex gap-2'>
							<label className='flex flex-col'>
								<span>KM</span>
								<input
									type='number'
									name='smallServiceKM'
									defaultValue={vehicle ? vehicle?.service?.small?.km : 0}
									className='border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none'
								/>
							</label>
							<label className='flex flex-col'>
								<span>Date</span>
								<input
									type='date'
									name='smallServiceDate'
									defaultValue={
										vehicle && vehicle?.service?.small?.date !== null
											? vehicle?.service?.small?.date.split('T')[0]
											: ''
									}
									className='border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none'
								/>
							</label>
						</div>
					</fieldset>
					<fieldset>
						<h4>Big</h4>
						<div className='flex gap-2'>
							<label className='flex flex-col'>
								<span>KM</span>
								<input
									type='number'
									name='bigServiceKM'
									defaultValue={vehicle ? vehicle?.service?.big?.km : 0}
									className='border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none'
								/>
							</label>
							<label className='flex flex-col'>
								<span>Date</span>
								<input
									type='date'
									name='bigServiceDate'
									defaultValue={
										vehicle && vehicle?.service?.big?.date !== null
											? vehicle?.service?.big?.date.split('T')[0]
											: ''
									}
									className='border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none'
								/>
							</label>
						</div>
					</fieldset>
					<fieldset>
						<label className='flex flex-col w-[205px]'>
							<span>KM</span>
							<input
								type='number'
								name='serviceKM'
								defaultValue={vehicle ? vehicle?.service?.km : 0}
								className='border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none'
							/>
						</label>
					</fieldset>
				</fieldset>
				<label>
					<h3>Tire Change</h3>
					<div className='flex gap-2'>
						<label className='flex flex-col'>
							<span>Summer</span>
							<input
								type='date'
								name='tireChangeSummer'
								defaultValue={
									vehicle && vehicle?.tireChange?.summer !== null
										? vehicle?.tireChange?.summer.split('T')[0]
										: 0
								}
								className='border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none'
							/>
						</label>
						<label className='flex flex-col'>
							<span>Winter</span>
							<input
								type='date'
								name='tireChangeWinter'
								defaultValue={
									vehicle && vehicle?.tireChange?.winter !== null
										? vehicle?.tireChange?.winter.split('T')[0]
										: 0
								}
								className='border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none'
							/>
						</label>
					</div>
				</label>
			</div>
			<button type='submit'>Add</button>
		</form>
	);
};

export default VehicleForm;
