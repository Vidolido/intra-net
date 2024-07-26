'use client';
import { useEffect, useState } from 'react';

// components
import LanguageInputContainer from '@/components/inputs/LanguageInputContainer';
import SelectInput from '@/components/inputs/SelectInput';
import RadioButtons from './RadioButtons';
import CollectionInput from './CollectionInput';
import ContextButton from '@/components/buttons/ContextButton';

const InsertSettingsForm = ({ setting, languages }) => {
  const [selectedCollection, setSelectedCollection] = useState('');
  const [inputType, setInputType] = useState('simple');
  const [parameterInput, setParameterInput] = useState('');
  const [collectionInput, setCollectionInput] = useState([]);
  const [error, setError] = useState({});

  let parameter =
    setting?.optionsSchema?.parameter?.name?.singular[languages[0].language];

  let collections = setting?.optionsSchema?.collections;
  // console.log(parameter, 'the parameter');
  //   console.log(collections, 'the collections');
  //   console.log(selectedCollection, 'selected collection');
  useEffect(() => {
    if (!selectedCollection) {
      setSelectedCollection(collections[0]._id);
    }
  }, [selectedCollection]);

  const hanldeMainParameterChange = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    let lang = e.target.name.split('-');
    lang = lang[lang.length - 1];
    // console.log(lang, 'the lang');
    setParameterInput((prev) => ({
      ...prev,
      [lang]: e.target.value,
    }));
  };

  const handleSelection = (e) => {
    // console.log(e.target.value);
    setSelectedCollection(e.target.value);
  };

  // this is just a test function
  const handleSubmit = (e) => {
    if (!parameterInput) {
      setError((prev) => ({
        ...prev,
        mainParameter: 'Fill all fields',
      }));
    } else {
      setError((prev) => ({
        ...prev,
        mainParameter: '',
      }));
    }
  };
  //   console.log(selectedCollection, 'selectedCollection ');
  console.log(parameterInput, 'the param input');
  return (
    <form className='border border-slate-200 rounded p-1'>
      <LanguageInputContainer
        label={!parameter ? 'Parameter name' : parameter}
        fieldSetClass='flex flex-col items-start'
        name='parameter-'
        languages={languages}
        defaultLanguage={languages[0]}
        onChange={hanldeMainParameterChange}
      />
      <p>{error.mainParameter}</p>
      <div className='flex gap-2'>
        <fieldset className='flex flex-col min-w-[200px]'>
          <label>Collection</label>

          <SelectInput
            name='collection-select'
            options={collections}
            defaultLanguage='en'
            value={parameter && parameter}
            onChange={handleSelection}
          />
        </fieldset>
        <fieldset className='flex flex-col'>
          <label>Input Type</label>
          <RadioButtons
            divClasses='flex gap-1 w-full'
            labelClasses={`flex flex-col items-center border border-slate-200 rounded hover:bg-red-500 hover:text-white cursor-pointer px-3 py-[2px]`}
            inputClasses='hidden'
            labels={['Simple', 'Translations', 'key/value']}
            name='inputType'
            inputType={inputType}
            onChange={(e) => setInputType(e.target.value)}
          />
        </fieldset>
      </div>
      <CollectionInput
        languages={languages}
        inputType={inputType}
        selectedCollection={selectedCollection}
        collectionInput={collectionInput}
        setCollectionInput={setCollectionInput}
        setError={setError}
      />
      <p>{error.collectionInput}</p>
      <ContextButton
        label='Add Setting'
        type='edit'
        classes='w-full'
        onClick={handleSubmit}
      />
    </form>
  );
};

export default InsertSettingsForm;
