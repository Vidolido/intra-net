'use client';
import { useState } from 'react';

// components
import LanguageInputContainer from '@/components/inputs/LanguageInputContainer';
import LanguageInput from '@/components/reusable/LanguageInput';

const MainInput = ({ setting, languages, error, state, setState }) => {
  //   const singular = setting?.optionsSchema?.parameter?.name?.singular;
  //   const plural = setting?.optionsSchema?.parameter?.name?.plural;

  const handleParameter = (e) => {
    setState((prev) => ({
      ...prev,
      parameter: {
        name: {
          ...prev.parameter.name,
          ...e,
        },
      },
    }));
  };

  return (
    <fieldset
      name='option-schema-main'
      className='border border-slate-300 rounded p-1'>
      <h5>Main parameter</h5>
      <div className='flex gap-2'>
        <div>
          <LanguageInput
            languages={languages}
            data={{
              state: state?.parameter?.name?.singular,
              inputName: 'singular',
            }}
            extractData={handleParameter}
          />
          <p>{error?.singular}</p>
        </div>
        <div>
          <LanguageInput
            languages={languages}
            data={{
              state: state?.parameter?.name?.plural,
              inputName: 'plural',
            }}
            extractData={handleParameter}
          />
          <p>{error?.plural}</p>
        </div>
      </div>
    </fieldset>
  );
};

export default MainInput;
