'use client';
import { useState } from 'react';

// components
import ArrowSvg from '@/../public/arrow.svg';
import SingleField from './SingleField';

function findHighestOrder(arr) {
  return arr.reduce((max, obj) => {
    return obj.order !== undefined && obj.order > max ? obj.order : max;
  }, 0);
}

const CheckBoxFields = ({ document, fields, setFields }) => {
  const [visible, setVisible] = useState(false);
  const handleHide = () => {
    setVisible(!visible);
  };

  //   let fields = document.basicInfo
  //     ? dbFields.reduce((acc, currentValue) => {
  //         let matchedField = document.basicInfo.fields.find(
  //           (bIF) => bIF._id.toString() === currentValue._id.toString()
  //         );
  //         if (matchedField) {
  //           currentValue.checked = true; // Set 'checked' if match is found
  //         }
  //         acc.push(currentValue); // Push the current field into the accumulator
  //         return acc;
  //       }, [])
  //     : dbFields;

  //   console.log(fields, 'FIELDS');
  //   console.log(document.basicInfo, 'BASIC INFO');

  const handleChecked = (e) => {
    let order = findHighestOrder(fields);
    const newFields =
      fields.length > 0 &&
      fields.map((field) => {
        if (field?._id === e.target.value) {
          !field.checked ? (field.checked = true) : (field.checked = false);
          field.order = order + 1;
        }
        return field;
      });
    setFields(newFields);
  };
  return (
    <fieldset className='bg-white border border-slate-200 pl-1 rounded'>
      <button type='button' onClick={handleHide} className='relative w-full'>
        <h3 className='text-left'>Fields</h3>
        <ArrowSvg
          className={`w-[22px] h-[22px] absolute right-1 top-[3px] fill-red-500 hover:fill-red-300 ${
            visible ? '' : 'rotate-180'
          }`}
        />
      </button>
      <fieldset
        className={`grid grid-cols-2 ${!visible ? 'hidden' : 'visible'}`}>
        {fields.length > 0
          ? fields.map((field) => (
              <SingleField
                key={field?._id}
                field={field}
                basicInfo={document?.basicInfo}
                onChange={handleChecked}
              />
            ))
          : null}
      </fieldset>
    </fieldset>
  );
};

export default CheckBoxFields;
