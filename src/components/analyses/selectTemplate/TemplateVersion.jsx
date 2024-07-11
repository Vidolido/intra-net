'use client';
import { useEffect, useRef } from 'react';

// state/components
import { saveTemplateId } from '@/serverActions/laboratoryAnalyses/saveTemplateId';

const TemplateVersion = ({ templates, analysisId }) => {
	let mutTemplates = templates.map((template, index) => ({
		index,
		id: template._id,
		template: template.template,
	}));

	const selectRef = useRef();

	// Овој useEffect треба да го средам
	useEffect(() => {
		let fn = async () => {
			if (
				selectRef.current !== undefined &&
				selectRef.current.value === 'none'
			) {
				await saveTemplateId(selectRef.current.value, analysisId);
			}
		};
		fn().catch((e) => console.log(e)); // да фатам грешки
	}, [selectRef?.current?.value, templates.length, analysisId]);

	const handleChange = async (e) => {
		await saveTemplateId(e.target.value, analysisId);
	};

	return (
		<fieldset
			name='template-version'
			className='flex gap-4 items-center justify-between border rounded p-1'>
			<h6>Template Version</h6>

			<select ref={selectRef} onChange={handleChange}>
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
