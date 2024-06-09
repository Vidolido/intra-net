import React from 'react';
import { productsList } from './products';
import SelectInput from '@/components/inputs/SelectInput';

const Product = () => {
	const products = productsList;
	return (
		<fieldset>
			<h6>Product</h6>
			<SelectInput options={productsList} value='type' defaultLanguage='en' />
		</fieldset>
	);
};

export default Product;
