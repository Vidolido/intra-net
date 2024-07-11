'use client';

// state/actions
import { saveTemplateResult } from '@/serverActions/laboratoryAnalyses/saveTemplateResult';

// components
import ContextButton from '@/components/buttons/ContextButton';
import TemplateInputFields from './TemplateInputFields';

const TemplateForm = ({ template, languages, settings }) => {
	let defaultLanguage = languages.find((lang) => lang.language === 'en');

	// console.log(template, 'the template');
	return !template ? (
		<h4>Please select a template</h4>
	) : (
		<form action={saveTemplateResult}>
			<TemplateInputFields
				template={template}
				settings={settings}
				defaultLanguage={defaultLanguage}
			/>
			{/* <ContextButton
				label='Save'
				type='edit'
				onClick={(e) => e.target.form.requestSubmit()}
			/> */}
		</form>
	);
};

export default TemplateForm;
