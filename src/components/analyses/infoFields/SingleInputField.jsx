// components
import InputType from '../../inputs/InputType';

const SingleInputField = ({ field, onChange }) => {
	return (
		<label>
			<span className='block'>{field.name['en']}</span>
			<InputType
				id={field._id}
				name={field._id}
				type={field?.inputType}
				classes={'min-w-fit'}
				onChange={onChange}
			/>
		</label>
	);
};

export default SingleInputField;
