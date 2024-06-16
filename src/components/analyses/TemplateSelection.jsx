'use client';

// components
import DocumentType from '../templates/basic/DocumentType';
import Origin from '../templates/basic/Origin';
import Product from '../templates/basic/Product';
import SampleType from '../templates/basic/SampleType';

const TemplateSelection = ({ templateSettings }) => {
	// let products = templateSettings.filter(
	// 	(setting) => setting.settingName === 'Products'
	// );
	// let types = templateSettings.filter(
	// 	(setting) => setting.settingName === 'Types'
	// );
	// let countries = templateSettings.filter(
	// 	(setting) => setting.settingName === 'Countries'
	// );

	// const handleProductChange = (e) => {
	// 	console.log(e.target);
	// };

	// console.log(templateSettings, 'again');
	return (
		<fieldset name='template-selection'>
			<h3>Header</h3>
			{/* <Product
				products={products[0]}
				languages={languages}
				onChange={handleProductChange}
			/>
			<SampleType types={types[0]} />
			<Origin countries={countries[0]} />
			<DocumentType types={types[0]} /> */}
		</fieldset>
	);
};

export default TemplateSelection;
