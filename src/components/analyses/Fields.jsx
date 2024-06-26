'use client';
import { useEffect, useState } from 'react';

// state/actions
import { ADD } from '@/state/actionTypes';
import {
  useLaboratoryContext,
  useLaboratoryDispatchContext,
} from '@/state/laboratoryContext';
import { mutateFields } from '@/utils/mutateFields';

// components
import SingleField from './SingleField';
import ArrowSvg from '@/../public/arrow.svg';

const Fields = ({ languages, fields: dbFields }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useLaboratoryDispatchContext();
  const { fields } = useLaboratoryContext();
  const mutFields = mutateFields(dbFields);

  useEffect(() => {
    dispatch({
      type: ADD,
      payload: {
        state: 'fields',
        value: mutFields,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleHide = () => {
    setVisible(!visible);
  };

  return (
    <fieldset>
      <button type='button' onClick={handleHide} className='relative w-full'>
        <h3 className='text-left'>Fields</h3>
        <ArrowSvg
          className={`w-[22px] h-[22px] absolute right-1 top-[2px] fill-red-500 hover:fill-red-300 ${
            visible ? '' : 'rotate-180'
          }`}
        />
      </button>
      <div className={`grid grid-cols-2 ${!visible ? 'hidden' : 'visible'}`}>
        {fields.length > 0
          ? fields.map((field) => <SingleField key={field._id} field={field} />)
          : ''}
      </div>
    </fieldset>
  );
};

export default Fields;
