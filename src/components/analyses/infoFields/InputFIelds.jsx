'use client';

// components
import SingleInputField from '../SingleInputField';

const InputFields = ({ fields, onChange }) => {
	return (
		<fieldset name='document-fields'>
			{/* <h3>Input Fields</h3> */}
			<div className='px-1'>
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
			</div>
		</fieldset>
	);
};

export default InputFields;
