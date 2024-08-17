'use client';

// state/actions
import { saveTemplateResult } from '@/serverActions/laboratoryAnalyses/saveTemplateResult';

// components
import TemplateInputFields from './TemplateInputFields';
import { useRouter } from 'next/navigation';

const TemplateForm = ({
	templateId,
	template,
	languages,
	settings,
	analysisId,
}) => {
	let router = useRouter();
	let defaultLanguage = languages.find((lang) => lang.language === 'en');

	const submit = saveTemplateResult.bind(null, analysisId);
	return templateId === undefined || templateId === 'none' ? (
		<h4>Please select a template</h4>
	) : (
		<form
			action={async (e) => {
				await submit(e);
				// router.push('/dashboard/laboratory/analyses/edit/' + analysisId);
			}}>
			<TemplateInputFields
				template={template}
				settings={settings}
				defaultLanguage={defaultLanguage}
			/>
		</form>
	);
};

export default TemplateForm;
