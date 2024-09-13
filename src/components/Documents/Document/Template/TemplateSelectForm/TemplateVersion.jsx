'use client';
import { useEffect } from 'react';

// state/actions
// import { saveTemplateId } from '@/serverActions/laboratoryAnalyses/saveTemplateId';
import { saveTemplateId } from '@/data-access/documents/document/saveTemplateId';
import { filterTemplates } from '@/utils/filterTemplates';
import Template from './Template';
// import Template from '@/components/Templates/(page)/PublishedTemplates/Template';

const TemplateVersion = ({
  templates,
  templateId,
  documentId,
  header,
  settings,
}) => {
  const filteredTempaltes = filterTemplates(templates, header);
  let mutTemplates = filteredTempaltes.map((template, index) => ({
    index,
    _id: template._id,
    template: template.template,
  }));

  useEffect(() => {
    let fn = async () => {
      await saveTemplateId(
        templateId != undefined ? templateId : 'none',
        header,
        documentId
      );
    };
    fn();
  }, [
    header,
    header.product,
    header.origin,
    header.sampleType,
    header.documentType,
    templateId,
    documentId,
  ]);

  const template = templates.find(
    (template) => template._id === document.templateId
  );

  // const documentType = settings.documentTypes.find(
  //   (type) => type._id === template.documentType
  // );
  // const sampleType =
  //   settings.sampleTypes.find((type) => type._id === template.sampleType) ||
  //   'none';

  // const country = settings.countries.find(
  //   (country) => country._id === template.origin
  // );

  // Доколку е драфт верзија да се брише темплејтот доколку се зачува
  const handleChange = async (e) => {
    await saveTemplateId(e.target.value, header, documentId);
  };
  console.log(settings, 'the settings');
  console.log(template, 'template');
  // console.log(templates, 'templates');
  console.log(filteredTempaltes, 'filteredTempaltes');
  console.log(mutTemplates, 'mutTemplates');
  return (
    <fieldset
      name='template-version'
      className='flex gap-4 items-center justify-between border rounded p-1'>
      {/* <h6>Template Version</h6> */}

      <ul className='w-full'>
        <li className='grid grid-cols-[1fr_1fr_1fr_25px] col-end-auto text-black font-semibold bg-slate-200 '>
          <p className='pl-1 pb-1 min-w-36'>Type</p>
          <p className='border-l border-slate-400 pl-1 pb-1'>Country</p>
          <p className='border-l border-slate-400 pl-1 pb-1'>Sample</p>
          <p></p>
        </li>
        {filteredTempaltes.map((template) => {
          return (
            <li
              key={template._id}
              className='grid grid-cols-[1fr_1fr_1fr_25px] border-b last-of-type:border-transparent hover:border-red-300'>
              <Template template={template} settings={settings} />
              {/* <p className='pl-1 border-l border-transparent'>
                {documentType?.name['en'] || '--'}
              </p>
              <p className='pl-1 border-l border-slate-300'>
                {country?.name['en'] || '--'}
              </p>
              <p className='pl-1 border-l border-slate-300'>
                {sampleType !== 'none' ? sampleType?.name['en'] : '--'}
              </p>
              <div className='border-l border-slate-300 relative'>
                <Options
                  _id={template._id}
                  edit={{
                    show: true,
                    link: '/dashboard/laboratory/templates/edit/',
                    classes: 'hover:underline text-black',
                  }}
                  deleteItem={{
                    show: true,
                    type: 'default',
                    onClick: handleDelete,
                    classes: 'self-end',
                  }}
                />
              </div> */}
            </li>
          );
        })}
      </ul>

      {/* <select value={templateId} onChange={handleChange}>
        <option value='none'>--</option>
        {mutTemplates.map((template, index) => (
          <option key={index} value={template.id}>
            {index}
          </option>
        ))}
      </select> */}
    </fieldset>
  );
};

export default TemplateVersion;
