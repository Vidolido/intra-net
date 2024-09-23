'use client';

import InputType from '@/components/inputs/InputType';
// components
import SingleInputField from './SingleInputField';
import { nameArray } from '@/utils/nameArray';
import SelectInput from '@/components/inputs/SelectInput';

const InputFields = ({ customers, fields, onChange }) => {
	let mutCustomers = customers.map((customer) => ({
		_id: customer._id,
		...nameArray(customer.name),
	}));

	// console.log(mutCustomers, 'mut CUSTOMERS');
	// console.log(customers, 'mut customers');

	return (
		<fieldset name='document-fields'>
			<ul className='px-1'>
				<label>
					<span className='block'>Customer</span>
					<SelectInput options={customers} defaultLanguage={'en'} />
				</label>

				{fields.length > 0
					? fields.map((field) =>
							field.checked !== 'false' ? (
								<SingleInputField
									key={field._id}
									field={field}
									onChange={onChange}
								/>
							) : (
								''
							)
					  )
					: ''}
			</ul>
		</fieldset>
	);
};

export default InputFields;
