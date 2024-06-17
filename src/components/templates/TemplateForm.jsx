// components
import DocumentType from './basic/DocumentType';
import Origin from './basic/Origin';
import Product from './basic/Product';
import SampleType from './basic/SampleType';
import TemplateFormInput from './inputForm/TemplateFormInput';
import TableHeaders from './inputForm/TableHeaders';
import SaveBasic from './basic/SaveBasic';

const TemplateForm = ({ languages, settings, draft, templateSettings }) => {
  const defaultLanguage = {
    _id: '6656eed3b12adae590481cfe',
    language: 'en',
    locale: 'en-US',
  };
  let products = templateSettings.filter(
    (setting) => setting.settingName === 'Products'
  );
  let types = templateSettings.filter(
    (setting) => setting.settingName === 'Types'
  );
  let countries = templateSettings.filter(
    (setting) => setting.settingName === 'Countries'
  );
  // console.log(products[0], 'in templateForm');
  //   let productIds = products[0]?.settings.filter(
  //     (setting) => setting._id === draft.product
  //   );
  //   console.log(templateSettings, 'the templateSettings');
  //   console.log(productIds, 'the products');
  console.log(draft.product, 'the draft');
  console.log(draft.sampleType, 'the draft');
  console.log(draft.documentType, 'the draft');
  console.log(draft.origin, 'the draft');

  return (
    <form className='w-fit bg-slate-100 flex flex-col gap-1 p-1'>
      <h4>Template Form</h4>
      <div className='flex gap-2 border border-slate-300 rounded w-fit p-2'>
        <Product
          products={products[0]}
          languages={languages}
          value={draft.product}
        />
        <SampleType types={types[0]} defaultValue={draft.sampleType} />
        <Origin countries={countries[0]} defaultValue={draft.origin} />
        <DocumentType types={types[0]} defaultValue={draft.documentType} />
        <SaveBasic draft={draft} />
      </div>
      <div className='border border-slate-300 rounded w-fit p-2'>
        <h5>Template Settings</h5>

        <div id='addTemplateSchema'>
          <TableHeaders settings={settings} defaultLanguage={defaultLanguage} />

          <TemplateFormInput
            document={draft._id}
            settings={settings}
            defaultLanguage={defaultLanguage}
          />
        </div>
      </div>
    </form>
  );
};

export default TemplateForm;
