'use client';
import { useState } from 'react';

// components
import DocumentType from '@/components/Templates/basic/DocumentType';
import Origin from '@/components/Templates/basic/Origin';
import Product from '@/components/Templates/basic/Product';
import SampleType from '@/components/Templates/basic/SampleType';
import TemplateVersion from './TemplateVersion';

const TemplateSelectForm = ({
	analysis,
	languages,
	settings,
	products,
	types,
	countries,
	templates,
}) => {
	let isPublished = analysis.documentStatus === 'published' ? true : false;
	// Доколку анализата има веќе зачувано темплејт се користи templateHeader
	// во спротивно се праваи нов State
	const template = templates.find(
		(template) => template._id === analysis.templateId
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
	return (
		!isPublished && (
			<form className='flex flex-col gap-2'>
				<div className='flex gap-2'>
					<Product
						name='product'
						products={settings?.products}
						languages={languages}
						setHeader={setHeader}
						classes={'w-32'}
					/>
					<Origin
						name='origin'
						countries={settings?.countries}
						setHeader={setHeader}
						classes={'w-32'}
						languages={languages}
					/>
				</div>
				<div className='flex gap-2'>
					<SampleType
						name='sampleType'
						types={settings?.sampleTypes}
						setHeader={setHeader}
						none={true}
						classes={'w-32'}
						languages={languages}
					/>
					<DocumentType
						name='documentType'
						types={settings?.documentTypes}
						setHeader={setHeader}
						classes={'w-32'}
						languages={languages}
					/>
				</div>
				<div className='pr-1'>
					<TemplateVersion
						templates={templates}
						templateId={analysis.templateId}
						analysisId={analysis._id}
						header={header}
					/>
				</div>
			</form>
		)
	);
};

export default TemplateSelectForm;
