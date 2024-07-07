'use client';

// state/actions
import { useLaboratoryContext } from '@/state/laboratoryContext';

// components
import TemplateInputFields from './analysesTemplate/TemplateInputFields';

const AnalysisTemplate = ({ templates, languages, settings }) => {
	const { selectedTemplate } = useLaboratoryContext();

	let defaultLanguage = languages.find((lang) => lang.language === 'en');

	let selection = templates.find(
		(template) => template._id === selectedTemplate
	);

	return !selection ? (
		<h4>Please select a template</h4>
	) : (
		<TemplateInputFields
			template={selection}
			settings={settings}
			defaultLanguage={defaultLanguage}
		/>
	);
};

export default AnalysisTemplate;
