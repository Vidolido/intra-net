// 'use client';
import TemplateSelectForm from './TemplateSelectForm';
import TemplateResults from './TemplateResults';

const TemplateForms = ({
	document,
	languages,
	settings,
	laboratorySettings,
	templates,
}) => {
	// const template =
	// 	document.templateId !== null &&
	// 	templates.find((template) => template._id === document.templateId);
	console.log(document.template != null, 'document.template');
	console.log(document?.template?.length > 0, 'document?.template?.length > 0');
	let template = [];
	if (document?.template != null && document?.template?.length > 0) {
		console.log('fist is true');
		template = [...document.template];
	}
	console.log(document.templateId != null, 'document.templateId');
	if (document.templateId != null && document?.template == null) {
		console.log('second is true');

		template = templates.find(
			(template) => template._id === document.templateId
		).template;
	}

	console.log(document, 'the  document');
	console.log(template, 'the  template');
	return (
		<div className='w-[80%]'>
			{template.length > 0 && (
				<TemplateResults
					templateId={document.templateId}
					// template={template?.template || []}
					template={template}
					languages={languages}
					laboratorySettings={laboratorySettings}
					documentId={document._id}
				/>
			)}
		</div>
	);
};

export default TemplateForms;
