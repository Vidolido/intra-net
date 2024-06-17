'use client';
const SingleField = ({ field }) => {
	const handleChange = (e) => {
		console.log(e.target.value);
	};
	return (
		<label>
			<input
				type='checkbox'
				value={field._id}
				checked={field.checked === 'false' ? '' : field.checked}
				onChange={handleChange}
			/>{' '}
			<span>{field.name['en']}</span>
		</label>
	);
};

export default SingleField;
