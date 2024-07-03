'use client';

// state/actions
import { useLaboratoryContext } from '@/state/laboratoryContext';

// components
import SingleInputField from './SingleInputField';

const BasicInputFields = () => {
  const { fields } = useLaboratoryContext();

  return (
    <fieldset>
      {/* <h3>Input Fields</h3> */}
      <div className='px-1'>
        {fields.length > 0
          ? fields.map((field) =>
              field.checked !== 'false' ? (
                <SingleInputField key={field._id} field={field} />
              ) : (
                ''
              )
            )
          : ''}
      </div>
    </fieldset>
  );
};

export default BasicInputFields;
