'use client';

import { useLaboratoryContext } from '@/state/laboratoryContext';
import { filterTemplates } from '@/utils/filterTemplates';

const AnalysisTemplate = ({ templates }) => {
	const state = useLaboratoryContext();
	const { header, selectedTemplate } = useLaboratoryContext();
	// let filteredTempaltes = filterTemplates(templates, header);
	let selection = templates.find(
		(template) => template._id === selectedTemplate
	);
	console.log(selection, 'selection');
	console.log(state, 'state in Analysis Template');
	// console.log(header, 'header in Analysis Template');
	// console.log(templates, 'templates in Analysis Template');
	// console.log(filteredTempaltes, 'templates in Analysis Template');

	return (
		<div>
			{!selection
				? 'Please select a template'
				: selection.template.map((templateItem) => (
						<div key={templateItem._id}>
							{templateItem?.parameter?.propertyValue['en']}
						</div>
				  ))}
		</div>
	);
};

export default AnalysisTemplate;
