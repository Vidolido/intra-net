import TemplateForm from './TemplateForm';
import TemplateSelectForm from './TemplateSelectForm';

const Template = ({
  document,
  languages,
  settings,
  laboratorySettings,
  templates,
}) => {
  const template = templates.find(
    (template) => template._id === document.templateId
  );
  const analysisTemplate = !document.template ? null : document.template;
  return (
    <div className='w-[80%]'>
      <TemplateSelectForm
        document={document}
        languages={languages}
        settings={settings}
        templates={templates}
      />
      <TemplateForm
        templateId={document.templateId}
        template={analysisTemplate || template?.template}
        languages={languages}
        laboratorySettings={laboratorySettings}
        documentId={document._id}
      />
    </div>
  );
};

export default Template;
