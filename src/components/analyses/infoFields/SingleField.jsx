'use client';

const SingleField = ({ field, onChange }) => {
	return (
		<label className='cursor-pointer'>
			<input
				type='checkbox'
				id={field._id}
				name='field-input'
				value={field._id}
				checked={field.checked === 'false' ? '' : field.checked}
				onChange={onChange}
			/>{' '}
			<span>{field.name['en']}</span>
		</label>
	);
};

export default SingleField;
