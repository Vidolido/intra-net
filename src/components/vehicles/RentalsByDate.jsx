'use client';
import { useVehicleContext } from '@/state/vehicleContext';
import RentalsDateCard from './RentalsDateCard';

const RentalsByDate = () => {
	const { state } = useVehicleContext();
	const transactionsByDate = state?.profile.transactions;

	// console.log(transactionsByDate, 'OVIJA');

	// Тука да ги сортирам по дата и да направам компонента која ќе ги групира трансакциите по дата и ќе даде таков приказ.
	// format: 2024-05-28: [transactionsByDate]
	return (
		<div>
			<div className='flex flex-wrap gap-2'>
				{transactionsByDate?.map((transaction) => (
					<RentalsDateCard key={transaction._id} transaction={transaction} />
				))}
			</div>
		</div>
	);
};

export default RentalsByDate;
