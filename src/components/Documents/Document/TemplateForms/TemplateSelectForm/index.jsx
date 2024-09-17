'use client';
import { useState } from 'react';

// components
import DocumentType from '@/components/Templates/basic/DocumentType';
import Origin from '@/components/Templates/basic/Origin';
import Product from '@/components/Templates/basic/Product';
import SampleType from '@/components/Templates/basic/SampleType';
import TemplateVersion from './TemplateVersion';
import { filterDocuments } from '@/serverActions/laboratoryAnalyses/filterDocuments';
import { filterTemplates } from '@/utils/filterTemplates';

const TemplateSelectForm = ({ document, languages, settings, templates }) => {
	let isPublished = document.documentStatus === 'published' ? true : false;
	// Доколку анализата има веќе зачувано темплејт се користи templateHeader
	// во спротивно се праваи нов State
	const template = templates.find(
		(template) => template._id === document.templateId
	);
	const templateHeader = {
		product: template?.product || '',
		origin: template?.origin || '',
		sampleType: template?.sampleType || '',
		documentType: template?.documentType || '',
	};

	const [header, setHeader] = useState(
		!template
			? {
					product: '',
					origin: '',
					sampleType: '',
					documentType: '',
			  }
			: templateHeader
	);
	// console.log(template, 'the  template');
	console.log(settings, 'THE SETTINGS IN  TEMPLATE  SELECT FORM');
	// console.log(header, 'THE  HEADER');
	const filteredTempaltes = filterTemplates(templates, header);
	console.log(filteredTempaltes, 'filteredTempaltes');

	return (
		!isPublished && (
			<form className='flex flex-col gap-2'>
				{!template && <h6>Please select a template</h6>}
				<div className='flex flex-row gap-2'>
					<Product
						name='product'
						products={settings?.products}
						languages={languages}
						setHeader={setHeader}
						classes={'w-32'}
					/>
					<DocumentType
						name='documentType'
						types={settings?.documentTypes}
						setHeader={setHeader}
						none={true}
						classes={'w-32'}
						languages={languages}
					/>
					<Origin
						name='origin'
						countries={settings?.countries}
						setHeader={setHeader}
						none={true}
						classes={'w-32'}
						languages={languages}
					/>
					<SampleType
						name='sampleType'
						types={settings?.sampleTypes}
						setHeader={setHeader}
						none={true}
						classes={'w-32'}
						languages={languages}
					/>
				</div>
				<div className='pr-1'>
					<TemplateVersion
						templates={templates}
						templateId={document.templateId}
						documentId={document._id}
						header={header}
						settings={settings}
					/>
				</div>
			</form>
		)
	);
};

export default TemplateSelectForm;
