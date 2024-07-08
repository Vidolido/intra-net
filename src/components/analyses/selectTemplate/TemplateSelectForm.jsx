'use client';
// state/actions
import { filterTemplates } from '@/utils/filterTemplates';

// components
import DocumentType from '@/components/templates/basic/DocumentType';
import Origin from '@/components/templates/basic/Origin';
import Product from '@/components/templates/basic/Product';
import SampleType from '@/components/templates/basic/SampleType';
import TemplateVersion from '../TemplateVersion';
import { useState } from 'react';

const TemplateSelectForm = ({
	analysisId,
	languages,
	products,
	types,
	countries,
	templates,
}) => {
	const [header, setHeader] = useState({});

	const filteredTempaltes = filterTemplates(templates, header);

	return (
		<form className='flex flex-col gap-2'>
			<div className='flex gap-2'>
				<Product
					name='product'
					languages={languages}
					products={products}
					setHeader={setHeader}
					classes={'w-32'}
				/>
				<Origin
					name='origin'
					countries={countries}
					setHeader={setHeader}
					classes={'w-32'}
				/>
			</div>
			<div className='flex gap-2'>
				<SampleType
					name='sampleType'
					types={types}
					setHeader={setHeader}
					none={true}
					classes={'w-32'}
				/>
				<DocumentType
					name='documentType'
					types={types}
					setHeader={setHeader}
					classes={'w-32'}
				/>
			</div>
			<TemplateVersion templates={filteredTempaltes} analysisId={analysisId} />
		</form>
	);
};

export default TemplateSelectForm;
