'use client';
import { useRouter } from 'next/navigation';

// state/actions
import { saveTemplateResult } from '@/serverActions/laboratoryAnalyses/saveTemplateResult';

// components
import TemplateInputFields from './TemplateInputFields';

const TemplateResults = ({
	templateId,
	template,
	languages,
	laboratorySettings,
	documentId,
}) => {
	let router = useRouter();

	let defaultLanguage = languages.find((lang) => lang.language === 'en');

	const submit = saveTemplateResult.bind(null, documentId);
	return (
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

export default TemplateResults;
