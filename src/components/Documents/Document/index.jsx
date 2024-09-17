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

	return (
		<div className='flex gap-6 pr-3'>
			<div className='flex flex-col gap-1 shrink'>
				<SelectFields
					customers={customers}
					fields={settings?.fields}
					document={document}
				/>
			</div>
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
