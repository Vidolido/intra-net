// components
// import IdentificationNumbers from './IdentificationNumbers';
import SelectFields from './SelectFields';
import TemplateForms from './TemplateForms';

const Document = ({
	customers,
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
	const hasSelectedTemplate = !document.templateId ? true : false;

	return (
		<div className='flex gap-6 pr-3'>
			{!hasSelectedTemplate && (
				<div className='flex flex-col gap-1 shrink'>
					<SelectFields
						customers={customers}
						fields={settings?.fields}
						document={document}
						documentTypes={settings?.documentTypes}
					/>
				</div>
			)}
			<div className='w-[80%]'>
				<TemplateForms
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
