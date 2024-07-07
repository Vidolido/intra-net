'use client';

// state/actions
import { ADD, ADD_TO_COLLECTION } from '@/state/actionTypes';
import {
	useLaboratoryContext,
	useLaboratoryDispatchContext,
} from '@/state/laboratoryContext';
import { filterTemplates } from '@/utils/filterTemplates';

// components
import Product from '../templates/basic/Product';
import SampleType from '../templates/basic/SampleType';
import Origin from '../templates/basic/Origin';
import DocumentType from '../templates/basic/DocumentType';
import TemplateVersion from './TemplateVersion';

const TemplateSelect = ({
	languages,
	products,
	types,
	countries,
	templates,
}) => {
	const dispatch = useLaboratoryDispatchContext();
	const { header } = useLaboratoryContext();

	const filteredTempaltes = filterTemplates(templates, header);

	const handleOnChange = (e) => {
		console.log(e.target);
		if (e.target.name === 'templateVersion') {
			dispatch({
				type: ADD,
				payload: {
					state: 'selectedTemplate',
					value: e.target.value,
				},
			});
		} else {
			dispatch({
				type: ADD_TO_COLLECTION,
				payload: {
					state: 'header',
					value: {
						[e.target.name]: e.target.value,
					},
				},
			});
		}
	};

	console.log(header, 'the header');

	return (
		<fieldset name='template-selection' className='flex flex-col gap-2'>
			<div className='flex gap-2'>
				<Product
					name='product'
					products={products}
					languages={languages}
					onChange={handleOnChange}
					classes={'w-32'}
					dispatch={dispatch}
				/>
				<Origin
					name='origin'
					countries={countries}
					onChange={handleOnChange}
					classes={'w-32'}
				/>
			</div>
			<div className='flex gap-2'>
				<SampleType
					types={types}
					onChange={handleOnChange}
					classes={'w-32'}
					name='sampleType'
					none={true}
				/>
				<DocumentType
					name='documentType'
					types={types}
					onChange={handleOnChange}
					classes={'w-32'}
				/>
			</div>
			<TemplateVersion
				onChange={handleOnChange}
				templates={filteredTempaltes}
			/>
		</fieldset>
	);
};

export default TemplateSelect;
