'use client';

// state/actions
import { deleteTemplate } from '@/serverActions/laboratoryTemplates/deleteTemplate';

// components
import Options from '@/components/options/Options'; // might delete or refactor

const Template = ({ template, settings }) => {
  const handleDelete = async (_id) => {
    console.log(_id, 'DELETE ITEM');
    // await deleteDraftSetting(_id);
    await deleteTemplate(_id, 'published');
  };

  const documentType = settings.documentTypes.find(
    (type) => type._id === template.documentType
  );
  const sampleType =
    settings.sampleTypes.find((type) => type._id === template.sampleType) ||
    'none';

  const country = settings.countries.find(
    (country) => country._id === template.origin
  );
  console.log(documentType, sampleType, country, 'OVOJ settings');
  return (
    <>
      <p className='pl-1 border-l border-transparent'>
        {documentType?.name['en'] || '--'}
      </p>
      <p className='pl-1 border-l border-slate-300'>
        {country?.name['en'] || '--'}
      </p>
      <p className='pl-1 border-l border-slate-300'>
        {sampleType !== 'none' ? sampleType?.name['en'] : '--'}
      </p>
    </>
  );
};

export default Template;
