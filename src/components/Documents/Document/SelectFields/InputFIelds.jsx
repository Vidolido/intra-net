'use client';

// components
import SingleInputField from './SingleInputField';
import SelectInput from '@/components/inputs/SelectInput';

const InputFields = ({
	customers,
	fields,
	documentHeader,
	productAliases,
	onChange,
}) => {
	return (
		<fieldset name='document-fields'>
			<ul className='px-1'>
				<label>
					<span className='block'>Customer</span>
					<SelectInput options={customers} defaultLanguage={'en'} />
				</label>

				{fields.length > 0
					? fields.map((field) =>
							field.checked ? (
								<SingleInputField
									key={field._id}
									field={field}
									documentHeader={documentHeader}
									productAliases={productAliases}
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
