'use server';

import FilterByDate from '@/components/vehicles/FilterByDate';
import RentalsByDate from '@/components/vehicles/RentalsByDate';

// import { getTransactions } from '@/app/page';

// import PoolTransactionsDisplay from '@/components/ProfileRentals/PoolTransactionsDisplay';
// import ProfileRentalsForm from '@/components/ProfileRentals/ProfileRentalsForm';

const page = async () => {
	return (
		<div>
			<FilterByDate />
			{/* <ProfileRentalsForm /> */}
			<hr />
			<RentalsByDate />
			{/* <PoolTransactionsDisplay /> */}
		</div>
	);
};

export default page;
