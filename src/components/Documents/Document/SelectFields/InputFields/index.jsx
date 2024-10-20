'use client';

// components
import SingleInputField from './SingleInputField';
import SelectInput from '@/components/inputs/SelectInput';

const InputFields = ({
	languages,
	customers,
	fields,
	isTestReport,
	isCertificate,
	documentHeader,
	laboratoryNumber,
	productAliases,
	basicInfo,
	documentMeta,
	onChange,
}) => {
	// console.log(fields, 'OVIE FIELDS');
	let order = fields
		.filter((field) => field.checked)
		.map((field) => field.order);
	// console.log(order, 'THE ORDER');
	// console.log(customers, 'thecustomers');
	return (
		<fieldset name='document-fields'>
			<ul className='px-1'>
				{(isTestReport || isCertificate) && (
					<label>
						<span className='block'>Customer</span>
						<SelectInput
							options={customers}
							name='customer'
							defaultLanguage={'en'}
							none={true}
							defaultValue={documentMeta?.customer?._id || customers[0]._id}
						/>
					</label>
				)}

				{fields.length > 0 &&
					fields.map(
						(field) =>
							field.checked && (
								<SingleInputField
									key={field._id}
									languages={languages}
									id={field._id}
									order={order}
									fields={fields}
									field={field}
									documentHeader={documentHeader}
									laboratoryNumber={laboratoryNumber}
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
