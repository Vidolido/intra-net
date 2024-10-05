'use client';

// components
import SingleInputField from './SingleInputField';
import SelectInput from '@/components/inputs/SelectInput';

const InputFields = ({
	customers,
	fields,
	documentHeader,
	productAliases,
	basicInfo,
	onChange,
}) => {
	return (
		<fieldset name='document-fields'>
			<ul className='px-1'>
				<label>
					<span className='block'>Customer</span>
					<SelectInput
						options={customers}
						name='customer'
						defaultLanguage={'en'}
						defaultValue={basicInfo?.customer?.customerId || customers[0]._id}
					/>
				</label>

				{fields.length > 0 &&
					fields.map(
						(field) =>
							field.checked && (
								<SingleInputField
									key={field._id}
									id={field._id}
									field={field}
									documentHeader={documentHeader}
									productAliases={productAliases}
									basicInfo={basicInfo}
									onChange={onChange}
								/>
							)
					)}
			</ul>
		</fieldset>
	);
};

export default InputFields;
