import {
	getTransactions,
	getVehicles,
} from '../../dashboard/administration/apiCalls';

// components
import VehiclePoolForm from '@/components/vehicles/VehiclePoolForm';
import MakeReservation from '@/components/vehicles/MakeReservation';
import RentedVehicle from '@/components/vehicles/RentedVehicle';
import ReservedVehicle from '@/components/vehicles/ReservedVehicle';

const users = [
	{
		id: 1,
		name: 'Boshko Boshkovski',
		workId: '2020',
		vehicleId: '',
	},
	{
		id: 2,
		name: 'Vane Vanevski',
		workId: '2021',
		vehicleId: '',
	},
	{
		id: 3,
		name: 'Bekrija Delija',
		workId: '2022',
		vehicleId: '',
	},
];

const locations = ['Okta', 'Skopje', 'Kumanovo'];

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function page() {
	const { vehicles } = await getVehicles();
	const { transactions } = await getTransactions();

	const poolVehicles = vehicles.filter(
		(vehicle) =>
			vehicle.vehicleType === 'vehiclePool' && vehicle.inUse === false
	);
	const reservationVehicles = vehicles.filter(
		(vehicle) => vehicle.vehicleType === 'vehiclePool'
	);

	const pendingTransactions = transactions.filter(
		(transaction) => transaction.status === 'pending'
	);

	const reservedTransactions = transactions.filter(
		(transaction) => transaction.status === 'reserved'
	);
	return (
		<main>
			<div className='flex gap-20'>
				<div>
					<h1>Available Vehicles</h1>
					<VehiclePoolForm
						poolVehicles={poolVehicles}
						users={users}
						locations={locations}
					/>
				</div>
				<MakeReservation
					vehicles={reservationVehicles}
					users={users}
					locations={locations}
				/>
			</div>

			<br />
			<hr />
			<br />
			<RentedVehicle transactions={pendingTransactions} />
			<br />
			<hr />
			<br />
			<ReservedVehicle transactions={reservedTransactions} />
		</main>
	);
}
