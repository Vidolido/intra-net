// components
import IdentificationNumbers from './IdentificationNumbers';
import SelectFields from './SelectFields';
// import TemplateSelectForm from './TemplateSelectForm';
// import TemplateForm from './TemplateForm';
import Template from './Template';

const Document = ({
  document,
  settings,
  languages,
  laboratorySettings,
  templates,
}) => {
  // const template = templates.find(
  //   (template) => template._id === document.templateId
  // );
  // const analysisTemplate = !document.template ? null : document.template;

  return (
    <div className='flex gap-6 pr-3'>
      <div className='flex flex-col gap-1 shrink'>
        <IdentificationNumbers
          languages={languages}
          document={document}
          identificationNumbers={settings?.identificationNumbers}
        />
        <SelectFields fields={settings?.fields} document={document} />
      </div>
      <div className='w-[60%]'>
        <Template
          document={document}
          languages={languages}
          settings={settings}
          laboratorySettings={laboratorySettings}
          templates={templates}
        />
      </div>
    </div>
  );
};

export default Document;
