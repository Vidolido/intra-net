'use client';

import Product from '../templates/basic/Product';
import SampleType from '../templates/basic/SampleType';
import Origin from '../templates/basic/Origin';
import DocumentType from '../templates/basic/DocumentType';
import TemplateVersion from './TemplateVersion';

const TemplateSelect = ({ languages, products, types, countries }) => {
	const handleOnChange = (e) => {
		console.log(e.target.value);
	};

	return (
		<fieldset name='template-selection'>
			<h3>Header</h3>
			<Product
				products={products}
				languages={languages}
				onChange={handleOnChange}
			/>
			<SampleType types={types} onChange={handleOnChange} />
			<Origin countries={countries} onChange={handleOnChange} />
			<DocumentType types={types} onChange={handleOnChange} />
			<TemplateVersion onChange={handleOnChange} />
		</fieldset>
	);
};

export default TemplateSelect;
