import InputType from '../inputs/InputType';

const SingleInputField = ({ field }) => {
	return (
		<label>
			{field.name['en']}
			<InputType type={field?.type} />
		</label>
	);
};

export default SingleInputField;
