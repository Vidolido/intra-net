'use client';
import TemplateSelectForm from './TemplateSelectForm';
import TemplateResults from './TemplateResults';

const TemplateForms = ({
	document,
	languages,
	settings,
	laboratorySettings,
	templates,
}) => {
	// const [selectedTemplate, setSelectedTemplate] = useState('');
	const template = templates.find(
		(template) => template._id === document.templateId
	);
	const analysisTemplate = !document.template ? null : document.template;
	console.log(template, 'the template');
	console.log(analysisTemplate, 'the analysisTemplate');
	// console.log(templates, 'the templates');
	// console.log(document, 'the document');
	return (
		<div className='w-[80%]'>
			{!template && (
				<TemplateSelectForm
					document={document}
					languages={languages}
					settings={settings}
					templates={templates}
				/>
			)}
			{template && (
				<TemplateResults
					templateId={document.templateId}
					template={analysisTemplate || template?.template}
					languages={languages}
					laboratorySettings={laboratorySettings}
					documentId={document._id}
				/>
			)}
		</div>
	);
};

export default TemplateForms;