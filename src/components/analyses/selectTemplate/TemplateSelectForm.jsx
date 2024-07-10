'use client';
// state/actions
import { filterTemplates } from '@/utils/filterTemplates';

// components
import DocumentType from '@/components/templates/basic/DocumentType';
import Origin from '@/components/templates/basic/Origin';
import Product from '@/components/templates/basic/Product';
import SampleType from '@/components/templates/basic/SampleType';
import TemplateVersion from '../TemplateVersion';
import { useState } from 'react';

const TemplateSelectForm = ({
  analysis,
  languages,
  products,
  types,
  countries,
  templates,
}) => {
  // Доколку анализата има веќе зачувано темплејт се користи templateHeader
  // во спротивно се праваи нов State
  const template = templates.find(
    (template) => template._id === analysis.template
  );
  const templateHeader = {
    product: template?.product,
    origin: template?.origin,
    sampleType: template?.sampleType,
    documentType: template?.documentType,
  };
  const [header, setHeader] = useState(!template ? {} : templateHeader);

  const filteredTempaltes = filterTemplates(templates, header);

  return (
    <form className='flex flex-col gap-2'>
      <div className='flex gap-2'>
        <Product
          name='product'
          languages={languages}
          products={products}
          setHeader={setHeader}
          classes={'w-32'}
        />
        <Origin
          name='origin'
          countries={countries}
          setHeader={setHeader}
          classes={'w-32'}
        />
      </div>
      <div className='flex gap-2'>
        <SampleType
          name='sampleType'
          types={types}
          setHeader={setHeader}
          none={true}
          classes={'w-32'}
        />
        <DocumentType
          name='documentType'
          types={types}
          setHeader={setHeader}
          classes={'w-32'}
        />
      </div>
      <TemplateVersion
        templates={filteredTempaltes}
        analysisId={analysis._id}
      />
    </form>
  );
};

export default TemplateSelectForm;
