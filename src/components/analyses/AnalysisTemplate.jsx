'use client';

import { useLaboratoryContext } from '@/state/laboratoryContext';

const AnalysisTemplate = ({ templates }) => {
	const state = useLaboratoryContext();
	const { selectedTemplate } = useLaboratoryContext();
	let selection = templates.find(
		(template) => template._id === selectedTemplate
	);

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
