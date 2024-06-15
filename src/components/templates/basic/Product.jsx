import { nameArray } from '@/utils/nameArray';
import SelectInput from '@/components/inputs/SelectInput';

const Product = ({ languages, products }) => {
	let names = products?.settings.map((setting) => ({
		id: setting.id,
		...nameArray(setting.parameter.inputValue),
	}));
	// console.log(names[0]);
	return (
		<fieldset name='product-list'>
			<h6>Product</h6>
			{/* <SelectInput options={productsList} value='type' /> */}
			<SelectInput
				defaultLanguage={languages[0].language}
				options={names}
				label='en'
			/>
		</fieldset>
	);
};

export default Product;
