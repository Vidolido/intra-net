import { nameArray } from '@/utils/nameArray';
import SelectInput from '@/components/inputs/SelectInput';

const Product = ({ languages, products, onChange, value }) => {
	let names = products?.settings.map((setting) => ({
		id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));
	// console.log(names);
	return (
		<fieldset name='product-list'>
			<h6>Product</h6>
			{/* <SelectInput options={productsList} value='type' /> */}
			<SelectInput
				defaultLanguage={languages[0].language}
				options={names}
				label='en'
				onChange={onChange}
				defaultValue={value}
			/>
		</fieldset>
	);
};

export default Product;
