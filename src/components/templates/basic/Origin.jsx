import React from 'react';
import { countriesOfOrigin } from './countriesOfOrigin';
import SelectInput from '@/components/inputs/SelectInput';

const Origin = () => {
  const origin = countriesOfOrigin;
  return (
    <fieldset name='countries-of-origin'>
      <h6>Origin</h6>
      {/* <SelectInput options={origin} parameter='name' defaultLanguage='en' /> */}
      <SelectInput options={origin} value='id' defaultLanguage='en' />
    </fieldset>
  );
};

export default Origin;
