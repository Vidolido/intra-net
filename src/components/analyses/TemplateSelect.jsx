'use client';

import Product from '../templates/basic/Product';
import SampleType from '../templates/basic/SampleType';
import Origin from '../templates/basic/Origin';
import DocumentType from '../templates/basic/DocumentType';

const TemplateSelect = ({ languages, products, types, countries }) => {
	// console.log(products, 'in products');

	const handleProductChange = (e) => {
		console.log(e.target.value);
	};

	return (
		<fieldset name='template-selection'>
			<h3>Header</h3>
			<Product
				products={products}
				languages={languages}
				onChange={handleProductChange}
			/>
			<SampleType types={types} onChange={handleProductChange} />
			<Origin countries={countries} onChange={handleProductChange} />
			<DocumentType types={types} onChange={handleProductChange} />
		</fieldset>
	);
};

export default TemplateSelect;
