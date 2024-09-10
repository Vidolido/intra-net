'use client';
import { useEffect } from 'react';

// state/actions
import { saveTemplateId } from '@/serverActions/laboratoryAnalyses/saveTemplateId';
import { filterTemplates } from '@/utils/filterTemplates';

const TemplateVersion = ({ templates, templateId, documentId, header }) => {
	const filteredTempaltes = filterTemplates(templates, header);
	let mutTemplates = filteredTempaltes.map((template, index) => ({
		index,
		id: template._id,
		template: template.template,
	}));

	useEffect(() => {
		let fn = async () => {
			await saveTemplateId(
				templateId != undefined ? templateId : 'none',
				header,
				documentId
			);
		};
		fn();
	}, [
		header,
		header.product,
		header.origin,
		header.sampleType,
		header.documentType,
		templateId,
		documentId,
	]);

	// Доколку е драфт верзија да се брише темплејтот доколку се зачува
	const handleChange = async (e) => {
		await saveTemplateId(e.target.value, header, documentId);
	};

	// console.log(templateId, 'TEMPLATE ID');
	return (
		<fieldset
			name='template-version'
			className='flex gap-4 items-center justify-between border rounded p-1'>
			<h6>Template Version</h6>

			<select value={templateId} onChange={handleChange}>
				<option value='none'>--</option>
				{mutTemplates.map((template, index) => (
					<option key={index} value={template.id}>
						{index}
					</option>
				))}
			</select>
		</fieldset>
	);
};

export default TemplateVersion;
