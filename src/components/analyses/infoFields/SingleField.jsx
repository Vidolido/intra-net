'use client';

const SingleField = ({ field, onChange }) => {
	return (
		<label className='cursor-pointer'>
			<input
				type='checkbox'
				value={field._id}
				checked={field.checked === 'false' ? '' : field.checked}
				onChange={onChange}
			/>{' '}
			<span>{field.name['en']}</span>
		</label>
	);
};

export default SingleField;
