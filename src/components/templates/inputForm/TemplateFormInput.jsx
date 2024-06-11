'use client';
import { useState } from 'react';

// state/asctions
import { generateUUID } from '@/utils/generateUUID';

// components
import SelectInput from '../../inputs/SelectInput';

const TemplateFormInput = ({ settings, defaultLanguage }) => {
  const [selection, setSelection] = useState();

  let properties = settings.map((setting) => ({
    _id: setting._id,
    name: { ...setting.parameter.inputValue },
  }));

  const handleChange = (e) => {
    let selected = settings.filter((setting) => setting._id === e.target.value);
    setSelection(...selected);
  };

  //   console.log(selection, 'the props');
  return (
    <div className='grid grid-cols-6 gap-4'>
      <div className='w-full'>
        <SelectInput
          options={properties}
          value='_id'
          defaultLanguage={defaultLanguage.language}
          classes='w-full'
          onChange={handleChange}
        />
      </div>
      {selection?.collections?.map((collection) => {
        let items = collection.items;
        return (
          <div className='w-full' key={collection._id}>
            {items.map((item) => {
              return (
                <p key={generateUUID()}>
                  {(typeof item.value === 'string' && item.value) ||
                    item.value[defaultLanguage.language] ||
                    `${item?.value?.key} - ${item?.value?.value}`}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default TemplateFormInput;
