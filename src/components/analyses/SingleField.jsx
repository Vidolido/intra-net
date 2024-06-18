'use client';

// state/context
import { useLaboratoryDispatchContext } from '@/state/laboratoryContext';

const SingleField = ({ field }) => {
  const dispatch = useLaboratoryDispatchContext();
  const handleChange = (e) => {
    console.log(e.target);
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
