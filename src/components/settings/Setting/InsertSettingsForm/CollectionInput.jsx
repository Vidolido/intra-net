'use client';
import { useState } from 'react';

import ContextButton from '@/components/buttons/ContextButton';
import InputType from '@/components/inputs/InputType';
import LanguageInputContainer from '@/components/inputs/LanguageInputContainer';

let types = (languages, value, onChange) => ({
  simple: <InputType type='text' name='collection-input' onChange={onChange} />,
  translations: (
    <LanguageInputContainer
      languages={languages}
      defaultLanguage={languages[0]}
      name='collection-language-inputs-'
      onChange={onChange}
    />
  ),
  'key/value': (
    <>
      <InputType type='text' name='key' onChange={onChange} />
      <InputType type='text' name='value' onChange={onChange} />
    </>
  ),
});

const CollectionInput = ({
  languages,
  inputType,
  selectedCollection,
  collectionInput,
  setCollectionInput,
  setError,
}) => {
  const [input, setInput] = useState('');

  const handleAdd = (e) => {
    console.log(e, 'the element');
    console.log(input, 'the input');
    if (!input) {
      setError((prev) => ({
        ...prev,
        collectionInput: 'Please enter a value',
      }));
    } else {
      setError('');
    }
    console.log(selectedCollection, 'selected Collection');
    // setCollectionInput((prev) => ({
    // 	...prev,
    // 	[selectedCollection]: [],
    // }));
  };

  const handleChange = (e) => {
    // console.log(e);
    console.log(e.target.name);
    console.log(e.target.value);
    setInput(e.target.value);
  };
  return (
    <fieldset className='flex items-start gap-2'>
      {types(languages, null, handleChange)[inputType]}
      <ContextButton
        label='Add to collection'
        type='edit'
        onClick={handleAdd}
      />
    </fieldset>
  );
};

export default CollectionInput;
