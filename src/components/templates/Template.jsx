import Header from './templateComponents/Header';
import TemplateForm from './TemplateForm';

const Template = ({
	title,
	languages,
	settings,
	template,
	groups,
	templateSettings,
}) => {
	return (
		<div className='flex flex-col gap-1 w-full pr-2'>
			<h2>{title}</h2>
			<Header
				languages={languages}
				templateSettings={templateSettings}
				template={template}
			/>
			{/* <TemplateForm
				languages={languages}
				settings={settings}
				template={template}
				groups={groups}
				templateSettings={templateSettings}
			/> */}
			{/* <Template template={template} /> */}
			{/* <TemplateCollection draft={draft} /> */}
		</div>
	);
};

export default Template;
