// components
import DocumentType from './basic/DocumentType';
import Origin from './basic/Origin';
import Product from './basic/Product';
import SampleType from './basic/SampleType';
import TemplateFormInput from './inputForm/TemplateFormInput';
import TableHeaders from './inputForm/TableHeaders';
import SaveBasic from './basic/SaveBasic';

const TemplateForm = ({ languages, settings, draft }) => {
  const defaultLanguage = {
    _id: '6656eed3b12adae590481cfe',
    language: 'en',
    locale: 'en-US',
  };

  return (
    <form className='w-fit bg-slate-100 flex flex-col gap-1 p-1'>
      <h4>Template Form</h4>
      <div className='flex gap-2 border border-slate-300 rounded w-fit p-2'>
        <Product />
        <SampleType />
        <Origin />
        <DocumentType />
        <SaveBasic />
      </div>
      <div className='border border-slate-300 rounded w-fit p-2'>
        <h5>Template Settings</h5>

        <div id='addTemplateSchema'>
          <TableHeaders settings={settings} defaultLanguage={defaultLanguage} />

          <TemplateFormInput
            settings={settings}
            defaultLanguage={defaultLanguage}
          />
        </div>
      </div>
    </form>
  );
};

export default TemplateForm;
