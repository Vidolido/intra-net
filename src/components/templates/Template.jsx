import TableHeaders from './inputForm/TableHeaders';
import TemplateFormInput from './inputForm/TemplateFormInput';
import TemplateCollection from './TemplateCollection';
import Header from './templateComponents/Header';
import TemplateItems from './templateComponents/TemplateItems';
import TemplateForm from './TemplateForm';

const Template = ({
	title,
	languages,
	settings,
	template,
	groups,
	templateSettings,
}) => {
	let defaultLanguage = languages.find(
		(language) => language.language === 'en'
	);

	// console.log(defaultLanguage);
	return (
		<div className='flex flex-col gap-1 w-full pr-2'>
			<h2>{title}</h2>
			<Header
				languages={languages}
				templateSettings={templateSettings}
				template={template}
			/>
			<div id='addTemplateSchema' className='bg-slate-200 rounded'>
				<TableHeaders settings={settings} defaultLanguage={defaultLanguage} />

				<TemplateFormInput
					document={template._id}
					settings={settings}
					groups={groups}
					defaultLanguage={defaultLanguage}
				/>
			</div>
			<h2>Template</h2>
			<TemplateItems
				template={template}
				settings={settings}
				defaultLanguage={defaultLanguage}
			/>
		</div>
	);
};

export default Template;