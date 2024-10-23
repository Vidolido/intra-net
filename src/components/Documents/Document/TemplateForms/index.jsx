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
	const template =
		document.templateId !== null &&
		templates.find((template) => template._id === document.templateId);

	// console.log(document, 'THE DOCUMENT IN TEMPLATEFORMS');

	return (
		<div className='w-[80%]'>
			{/* {!template && (
				<TemplateSelectForm
					document={document}
					languages={languages}
					settings={settings}
					templates={templates}
				/>
			)} */}
			{template && (
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
