'use client';
import { useState } from 'react';

// state/asctions
import { addTemplateSetting } from '@/serverActions/laboratoryTemplates/addTemplateSetting';
import { generateUUID } from '@/utils/generateUUID';

// components
import SelectInput from '../../inputs/SelectInput';
import InputType from '@/components/inputs/InputType';
import ContextButton from '@/components/buttons/ContextButton';
import GroupParam from './GroupParam';
import { isObjectEmpty } from '@/utils/functions';

const TemplateFormInput = ({ document, settings, groups, defaultLanguage }) => {
  const [selection, setSelection] = useState(settings[0]);

  const [selectedItems, setSelectedItems] = useState({});

  const [additional, setAdditional] = useState({
    result: selection.result || '',
    marginError: selection.marginError || '',
  });

  const [group, setGroup] = useState({});

  let properties = settings.map((setting) => ({
    _id: setting._id,
    name: { ...setting.parameter.inputValue },
  }));

  const handleChange = (e) => {
    let selected = settings.filter((setting) => setting._id === e.target.value);
    setSelection(...selected);
    setSelectedItems({});
    setAdditional({
      result: '',
      marginError: '',
    });
  };

  const handleCheck = (e) => {
    let isChecked = e.target.checked;
    let collectionId = e.target.name;

    if (isChecked && !selectedItems[collectionId]) {
      setSelectedItems((prevState) => ({
        ...prevState,
        [collectionId]: [e.target.value],
      }));
    }

    if (isChecked && selectedItems[collectionId]) {
      setSelectedItems((prevState) => ({
        ...prevState,
        [collectionId]: [...prevState[collectionId], e.target.value],
      }));
    }

    if (!isChecked) {
      let removeUnChecked = selectedItems[collectionId].filter(
        (item) => Number(item) !== Number(e.target.value)
      );
      setSelectedItems((prevState) => ({
        ...prevState,
        [collectionId]: removeUnChecked,
      }));
    }
  };

  const handleAdditionalInput = (e) => {
    setAdditional({
      ...additional,
      [e.target.name]: e.target.value,
    });
  };

  let handleAdd = async (e) => {
    let property = {
      _id: selection._id,
      propertyValue: selection.parameter.inputValue,
    };

    let collections = selection.collections;

    let mutCollections = collections.reduce((acc, currentValue) => {
      if (currentValue._id in selectedItems) {
        let itemsToFind = selectedItems[currentValue._id].map(
          (item) => currentValue.items[item]
        );
        acc[currentValue._id] = [...itemsToFind];
      } else {
        // Во оваа празна низа да додадам некакво поле колку да пополнува место.
        acc[currentValue._id] = [];
      }
      return acc;
    }, {});

    // Тука чекам грешка
    await addTemplateSetting({
      property,
      mutCollections,
      additional,
      group: !isObjectEmpty(group) && group,
      document,
    });
  };

  console.log(group, 'the group');

  return (
    <div className='grid grid-cols-7 gap-4'>
      <div className='w-full'>
        <SelectInput
          options={properties}
          value='_id'
          defaultLanguage={defaultLanguage.language}
          classes='w-full'
          onChange={handleChange}
        />
        <GroupParam selected={selection} setGroup={setGroup} groups={groups} />
      </div>
      {selection?.collections?.map((collection) => {
        let items = collection.items;
        return (
          <div className='w-full' key={collection._id}>
            {items.map((item, index) => {
              let check =
                selectedItems[collection._id] &&
                selectedItems[collection._id].includes(index.toString());
              return (
                <label key={generateUUID()} className='flex gap-1'>
                  <input
                    type='checkbox'
                    name={collection._id}
                    value={index}
                    onChange={handleCheck}
                    checked={check && check}
                  />
                  <span>
                    {(typeof item.value === 'string' && item.value) ||
                      item.value[defaultLanguage.language] ||
                      `${item?.value?.key} - ${item?.value?.value}`}
                  </span>
                </label>
              );
            })}
          </div>
        );
      })}
      <div>
        <InputType
          classes={'w-10/12'}
          name='result'
          value={additional.result}
          onChange={handleAdditionalInput}
        />
      </div>
      <div>
        <InputType
          classes={'w-10/12'}
          name='marginError'
          value={additional.marginError}
          onChange={handleAdditionalInput}
        />
      </div>
      <div>
        <ContextButton label='Add' type='edit' onClick={handleAdd} />
      </div>
    </div>
  );
};

export default TemplateFormInput;
