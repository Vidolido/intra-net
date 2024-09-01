'use client';
import { useEffect } from 'react';

// state/actions
import { nameArray } from '@/utils/nameArray';

// components
import SelectInput from '@/components/inputs/SelectInput';

const Product = ({ name, products, value, languages, classes, setHeader }) => {
	// let names = products?.settings.map((setting) => ({
	// 	_id: setting._id,
	// 	...nameArray(setting.parameter.inputValue),
	// }));

	useEffect(() => {
		if (setHeader) {
			setHeader((prev) => ({
				...prev,
				product: products[0]._id,
			}));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<fieldset name='product-list'>
			<h6>Product</h6>
			<SelectInput
				name={name}
				options={products}
				defaultValue={value}
				onChange={(e) =>
					setHeader
						? setHeader((prev) => ({
								...prev,
								product: e.target.value,
						  }))
						: null
				}
				defaultLanguage={languages[0].language}
				classes={classes}
			/>
		</fieldset>
	);
};

export default Product;
