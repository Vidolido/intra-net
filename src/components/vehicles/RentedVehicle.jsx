'use client';
import { returnVehicle } from '@/serverActions/vehicles';
import ActionButton from '../buttons/ActionButton';
// import ActionButton from '../Buttons/ActionButton';

const tableHeaders = ['Vehicle', 'User', 'Location', 'Time', 'Date', ''];

const RentedVehicle = ({ transactions }) => {
	return (
		<div>
			<h2 className='text-2xl font-semibold mb-4'>Vehicles in use</h2>
			<table>
				<thead>
					<tr className='text-left'>
						{tableHeaders?.map((headers, index) => (
							<th
								key={index}
								className='min-w-[200px] border p-2 last-of-type:border-0 text-lg'>
								{headers}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{transactions?.map((transaction) => {
						const payload = {
							vehicle: transaction.vehicle.plates,
							user: transaction.user,
							location: transaction.location,
							startTime: new Date(transaction.rentTime).toLocaleTimeString(
								'mk-MK'
							),
							startDate: new Date(transaction.rentTime)
								.toLocaleDateString('mk-MK')
								.split('.')
								.join('-'),
						};
						return (
							<tr key={transaction._id} className='text-left p-2'>
								{Object.entries(payload).map(([key, value]) => (
									<td
										key={key}
										className='min-w-[200px] border p-2 last-of-type:border-0'>
										{value}
									</td>
								))}

								<td className='px-4'>
									<ActionButton
										label='Return'
										action={returnVehicle}
										parameters={{
											transaction: transaction._id,
											vehicle: transaction.vehicle._id,
										}}
									/>
								</td>
							</tr>
						);
					})}
				</tbody>
				<tfoot></tfoot>
			</table>
		</div>
	);
};

export default RentedVehicle;
