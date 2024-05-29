import VehicleForm from '@/components/Vehicles/VehicleForm';

async function getVehicle(id) {
	const res = await fetch(`http://localhost:3000/api/vehicles/${id}`);

	if (!res.ok) {
		console.log(res);
		throw new Error('Failed to get vehicle from db. Reason: ' + res);
	}

	return res.json();
}
const page = async ({ params }) => {
	const { id } = params;
	const { vehicle } = await getVehicle(id);
	// console.log(vehicle, 'the vehicle');
	return (
		<div>
			Single Car
			<VehicleForm vehicle={vehicle} />
		</div>
	);
};

export default page;
