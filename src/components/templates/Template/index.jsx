// components
import Header from './(templateComponents)/Header';
import InputForm from './(templateComponents)/InputForm';
import TemplateItems from './(templateComponents)/TemplateItems';

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
			<InputForm
				document={template._id}
				settings={settings}
				groups={groups}
				defaultLanguage={defaultLanguage}
			/>

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
