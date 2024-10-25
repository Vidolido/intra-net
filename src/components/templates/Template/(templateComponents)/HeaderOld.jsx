// state/actions
import { saveBasicData } from '@/data-access/templates/saveBasicData';

// components
import DocumentType from '../basic/DocumentType';
import Origin from '../basic/Origin';
import Product from '../basic/Product';
import SampleType from '../basic/SampleType';
import DocumentStatus from './DocumentStatusOld';

const Header = ({ languages, templateSettings, template }) => {
  let products = templateSettings.find(
    (setting) => setting.settingName === 'Products'
  );
  let types = templateSettings.find(
    (setting) => setting.settingName === 'Types'
  );
  let countries = templateSettings.find(
    (setting) => setting.settingName === 'Countries'
  );
  const submit = saveBasicData.bind(null, template._id);
  return (
    <form action={submit}>
      <fieldset
        name='basic-input'
        className='flex gap-2 border border-slate-300 rounded w-fit p-2'>
        <Product
          name='product'
          products={products}
          value={template.product}
          languages={languages}
        />
        <SampleType
          name='sampleType'
          types={types}
          value={template.sampleType}
          none={true}
          languages={languages}
        />
        <Origin
          name='origin'
          countries={countries}
          value={template.origin}
          languages={languages}
        />
        <DocumentType
          name='documentType'
          types={types}
          value={template.documentType}
          languages={languages}
        />
        <DocumentStatus template={template} />
        <button
          type='submit'
          className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-semibold py-[2.5px] px-4 rounded self-end'>
          Save
        </button>
      </fieldset>
    </form>
  );
};

export default Header;
