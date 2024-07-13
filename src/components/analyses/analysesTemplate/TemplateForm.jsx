'use client';

// state/actions
import { saveTemplateResult } from '@/serverActions/laboratoryAnalyses/saveTemplateResult';

// components
import TemplateInputFields from './TemplateInputFields';

const TemplateForm = ({
	templateId,
	template,
	languages,
	settings,
	analysisId,
}) => {
	let defaultLanguage = languages.find((lang) => lang.language === 'en');

	const submit = saveTemplateResult.bind(null, analysisId);
	console.log(template, 'THE TEMPLATE');
	return templateId === 'none' ? (
		<h4>Please select a template</h4>
	) : (
		<form action={submit}>
			<TemplateInputFields
				template={template}
				settings={settings}
				defaultLanguage={defaultLanguage}
			/>
		</form>
	);
};

export default TemplateForm;
