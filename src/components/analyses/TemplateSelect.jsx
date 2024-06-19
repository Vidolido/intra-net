'use client';

// state/actions
import { ADD_TO_COLLECTION } from '@/state/actionTypes';
import { useLaboratoryDispatchContext } from '@/state/laboratoryContext';

// components
import Product from '../templates/basic/Product';
import SampleType from '../templates/basic/SampleType';
import Origin from '../templates/basic/Origin';
import DocumentType from '../templates/basic/DocumentType';
import TemplateVersion from './TemplateVersion';

const TemplateSelect = ({ languages, products, types, countries }) => {
  const dispatch = useLaboratoryDispatchContext();

  const handleOnChange = (e) => {
    dispatch({
      type: ADD_TO_COLLECTION,
      payload: {
        state: 'header',
        value: {
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  return (
    <fieldset name='template-selection' className='flex flex-col gap-2'>
      <h3>Header</h3>
      <div className='flex gap-2'>
        <Product
          name='product'
          products={products}
          languages={languages}
          onChange={handleOnChange}
          classes={'w-32'}
        />
        <Origin
          name='origin'
          countries={countries}
          onChange={handleOnChange}
          classes={'w-32'}
        />
      </div>
      <div className='flex gap-2'>
        <SampleType
          name='sampleType'
          types={types}
          onChange={handleOnChange}
          classes={'w-32'}
        />
        <DocumentType
          name='documentType'
          types={types}
          onChange={handleOnChange}
          classes={'w-32'}
        />
      </div>
      <TemplateVersion onChange={handleOnChange} />
    </fieldset>
  );
};

export default TemplateSelect;
