'use server';
// import { getTransactionsByDate } from '@/serverActions/vehicles';

// components
import VehicleError from '../errorComponents/VehicleError';
import SubmitButton from '../buttons/SubmitButtons';

const FilterByDate = () => {
	return (
		<form>
			{/* <form action={getTransactionsByDate}> */}
			<label>
				Choose From Date
				<input
					type='date'
					name='from'
					className='border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none'
				/>
				{/* <DateInput /> */}
			</label>
			<label>
				Choose To Date
				<input
					type='date'
					name='to'
					className='border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none'
				/>
				{/* <DateInput /> */}
			</label>
			<VehicleError errorFrom='profileTransactions' />
			<SubmitButton label='Search' element='from' />
		</form>
	);
};

export default FilterByDate;
