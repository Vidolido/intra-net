'use server';

// components
import FilterByDate from '@/components/vehicles/FilterByDate';
import RentalsByDate from '@/components/vehicles/RentalsByDate';

const page = async () => {
	return (
		<div>
			<FilterByDate />
			<hr />
			<RentalsByDate />
		</div>
	);
};

export default page;
