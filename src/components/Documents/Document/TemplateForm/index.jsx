'use client';
import { useRouter } from 'next/navigation';

// state/actions
import { saveTemplateResult } from '@/serverActions/laboratoryAnalyses/saveTemplateResult';

// components
import TemplateInputFields from './TemplateInputFields';

const TemplateForm = ({
	templateId,
	template,
	languages,
	laboratorySettings,
	documentId,
}) => {
	let router = useRouter();
	let defaultLanguage = languages.find((lang) => lang.language === 'en');

	const submit = saveTemplateResult.bind(null, documentId);
	return templateId === undefined || templateId === 'none' ? (
		<h4>Please select a template</h4>
	) : (
		<form
			action={async (e) => {
				await submit(e);
				router.push('/dashboard/laboratory/documents/edit/' + documentId);
			}}>
			<TemplateInputFields
				template={template}
				laboratorySettings={laboratorySettings}
				defaultLanguage={defaultLanguage}
			/>
		</form>
	);
};

export default TemplateForm;
