'use client';
import { useState } from 'react';

// components
import InputType from './InputType';

const LanguageInputContainer = ({
  fieldSetName = 'languge-input',
  fieldSetClass = '',
  label = '',
  labelClass = '',
  name = '',
  selectName = '',
  languages,
  inputs = null,
  defaultLanguage,
}) => {
  const [language, setLanguage] = useState(defaultLanguage?._id);

  const onSelectChange = (e) => {
    setLanguage(e.target.value);
  };
  // console.log(languages, 'THE FUCKING LANGUAGE');
  return (
    <fieldset name={fieldSetName} className={fieldSetClass}>
      <label className={labelClass}>
        <span>{label}</span>
      </label>
      <div className='flex gap-[1px] justify-center items-start'>
        {!inputs
          ? languages?.map((lang) => {
              return (
                <InputType
                  key={lang._id}
                  type='text'
                  name={`${name}-languages-${lang.language}`}
                  classes={language === lang._id ? 'visible' : 'hidden'}
                />
              );
            })
          : inputs?.map((input, index) => {
              const inputName = Object.keys(input)[0];
              const selectedLang = languages.filter(
                (lang) => lang._id === language
              )[0];
              const value = Object.values(input);

              return (
                <InputType
                  key={index}
                  type='text'
                  name={inputName}
                  classes={
                    inputName.includes(selectedLang?.language)
                      ? 'visible'
                      : 'hidden'
                  }
                  defaultValue={value}
                />
              );
            })}
        {/* </label> */}
        <select
          name={selectName}
          className='box-content border-[3px] border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none cursor-pointer'
          onChange={onSelectChange}
          value={language}>
          {languages.map((option) => {
            return (
              <option key={option._id} value={option._id}>
                {option.language}
              </option>
            );
          })}
        </select>
      </div>
    </fieldset>
  );
};

export default LanguageInputContainer;
