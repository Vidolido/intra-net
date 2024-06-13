import React from 'react';
import { productsList } from './products';
import SelectInput from '@/components/inputs/SelectInput';

const Product = () => {
  const products = productsList;
  return (
    <fieldset name='product-list'>
      <h6>Product</h6>
      {/* <SelectInput options={productsList} value='type' /> */}
      <SelectInput options={productsList} label='type' />
    </fieldset>
  );
};

export default Product;
