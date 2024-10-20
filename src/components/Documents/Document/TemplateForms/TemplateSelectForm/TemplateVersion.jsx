'use client';
import { useEffect } from 'react';

// state/actions
// import { saveTemplateId } from '@/serverActions/laboratoryAnalyses/saveTemplateId';
import { saveTemplateId } from '@/data-access/documents/document/saveTemplateId';
// import { filterTemplates } from '@/utils/filterTemplates';
import Template from './Template';
// import { filter } from '../../../../../../oldFiles/analyses/filter';
import { filterTemplates } from '@/utils/documents/filterTemplates';
// import { filterTemplates } from '@/utils/filterTemplates';
// import Template from '@/components/Templates/(page)/PublishedTemplates/Template';

const TemplateVersion = ({
	templates,
	templateId,
	documentId,
	header,
	settings,
}) => {
	const filteredTempaltes = filterTemplates(templates, header);
	console.log(filteredTempaltes, 'filtered');
	// const filteredTempaltes = filterTemplates(templates, header);
	// let mutTemplates = filteredTempaltes.map((template, index) => ({
	// 	index,
	// 	_id: template._id,
	// 	template: template.template,
	// }));

	console.log(header, 'the header');

	useEffect(() => {
		let fn = async () => {
			await saveTemplateId(
				templateId != undefined ? templateId : undefined,
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

	// const template = templates.find(
	// 	(template) => template._id === document.templateId
	// );

	// Доколку е драфт верзија да се брише темплејтот доколку се зачува
	const handleClick = async (_id, header) => {
		await saveTemplateId(_id, header, documentId);
	};

	return (
		<fieldset
			name='template-version'
			className='flex gap-4 items-center justify-between border rounded p-1'>
			<ul className='w-full'>
				<li className='grid grid-cols-[1fr_1fr_1fr_25px] col-end-auto text-black font-semibold bg-slate-200 '>
					<p className='pl-1 pb-1 min-w-36'>Document Type</p>
					<p className='border-l border-slate-400 pl-1 pb-1'>Origin</p>
					<p className='border-l border-slate-400 pl-1 pb-1'>Sample Type</p>
				</li>
				{filteredTempaltes.map((template) => {
					return (
						<li
							key={template._id}
							onClick={() =>
								handleClick(template._id, {
									product: template?.header?.product,
									documentType: template?.header?.documentType,
									origin: template?.header?.origin,
									sampleType: template?.header?.sampleType,
								})
							}
							className='grid grid-cols-[1fr_1fr_1fr_25px] border-b last-of-type:border-transparent hover:border-red-300 cursor-pointer'>
							<Template template={template} settings={settings} />
						</li>
					);
				})}
			</ul>
		</fieldset>
	);
};

export default TemplateVersion;
