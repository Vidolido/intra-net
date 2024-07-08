// components
import InputType from '../inputs/InputType';

const SingleInputField = ({ field }) => {
  return (
    <label>
      <span className='block'>{field.name['en']}</span>
      <InputType name={field._id} type={field?.type} classes={'min-w-fit'} />
    </label>
  );
};

export default SingleInputField;
