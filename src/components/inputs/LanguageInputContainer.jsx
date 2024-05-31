'use client';
import { useState } from 'react';

// components
import InputType from './InputType';

const LanguageInputContainer = ({
  label = '',
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

  return (
    <fieldset>
      <label>
        {label}

        {!inputs
          ? languages.map((lang) => {
              return (
                <InputType
                  key={lang._id}
                  type='text'
                  name={`${name}-languages-${lang.language}`}
                  classes={language === lang._id ? 'visible' : 'hidden'}
                />
              );
            })
          : inputs.map((input, index) => {
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
      </label>
      <select
        name={selectName}
        className='w-[250px] self-end border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none cursor-pointer'
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
    </fieldset>
  );
};

export default LanguageInputContainer;
