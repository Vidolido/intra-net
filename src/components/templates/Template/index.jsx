// components
import Header from '../templateComponents/Header';
import TableHeaders from '../inputForm/TableHeaders';
import TemplateFormInput from '../inputForm/TemplateFormInput';
import TemplateItems from '../templateComponents/TemplateItems';

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
			<h3>Template</h3>

			<TemplateItems
				template={template}
				settings={settings}
				defaultLanguage={defaultLanguage}
			/>
		</div>
	);
};

export default Template;
