import Link from 'next/link';

// icons
import SedanSvg from '@/../public/sedan.svg';
import PickUpSvg from '@/../public/pickup.svg';
import SUVSvg from '@/../public/suv.svg';

import { getVehicles } from '../apiCalls';

// import { getVehicles } from '@/app/page';

// export async function getVehicles() {
// 	const res = await fetch('http://localhost:3000/api/vehicles');

// 	if (!res.ok) {
// 		console.log(res);
// 		// throw {
// 		// 	code: 400,
// 		// 	errorMessage: 'You mustt be logged in to create events.',
// 		// 	err: res,
// 		// 	for: 'adminId',
// 		// 	message: 'Custom error',
// 		// };
// 		throw new Error('Failed to get vehicles from db. Reason: ' + res);
// 	}

// 	return res.json();
// }

// export async function getTransactions() {
// 	const res = await fetch('http://localhost:3000/api/transactions');

// 	if (!res.ok) {
// 		console.log(res);
// 		throw new Error('Failed to get transactions from db. Reason: ' + res);
// 	}

// 	return res.json();
// }

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
	const { vehicles } = await getVehicles();

	return (
		<div>
			<h2>Vehicles List</h2>
			<div>
				{vehicles.map((vehicle) => {
					return (
						<Link
							key={vehicle._id}
							href={`/dashboard/administration/vehicles/${vehicle._id}`}
							className='flex gap-4 items-center h-12 odd:bg-slate-200'>
							<div className='w-12 flex justify-center items-center'>
								<SedanSvg className='w-10 h-10' />
							</div>
							{/* <PickUpSvg className='w-[30px] h-[30px]  fill-red-700' /> */}
							{/* <SUVSvg className='w-[30px] h-[30px]' /> */}
							<p className='text-center'>{vehicle.plates}</p>
							<p className='text-center'>{vehicle.user}</p>
							<p className='text-center'>{vehicle.vehicleType}</p>
						</Link>
					);
				})}
			</div>
			<Link
				href='/dashboard/administration/vehicles/add'
				className='border border-red-300 hover:bg-red-300 rounded p-1'>
				Add Vehicle
			</Link>
		</div>
	);
};

export default page;
