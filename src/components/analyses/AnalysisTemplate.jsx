'use client';

import { useLaboratoryContext } from '@/state/laboratoryContext';
import { filterTemplates } from '@/utils/filterTemplates';

const AnalysisTemplate = ({ templates }) => {
	const state = useLaboratoryContext();
	const { header } = useLaboratoryContext();
	let filteredTempaltes = filterTemplates(templates, header);
	// console.log(state, 'state in Analysis Template');
	// console.log(header, 'header in Analysis Template');
	// console.log(templates, 'templates in Analysis Template');
	// console.log(filteredTempaltes, 'templates in Analysis Template');

	return <div>AnalysisTemplate</div>;
};

export default AnalysisTemplate;
