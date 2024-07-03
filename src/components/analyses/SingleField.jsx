'use client';

// state/actions
import { EDIT_COLLECTION_ITEM } from '@/state/actionTypes';
import { useLaboratoryDispatchContext } from '@/state/laboratoryContext';

const SingleField = ({ field }) => {
  const dispatch = useLaboratoryDispatchContext();

  const handleChange = () => {
    dispatch({
      type: EDIT_COLLECTION_ITEM,
      payload: {
        state: 'fields',
        value: field,
      },
    });
  };

  return (
    <label className='cursor-pointer'>
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
