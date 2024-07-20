'use client';
import { useEffect } from 'react';

// state/actions
import { nameArray } from '@/utils/nameArray';

// components
import SelectInput from '@/components/inputs/SelectInput';

const Product = ({ name, languages, products, setHeader, classes, value }) => {
	let names = products?.settings.map((setting) => ({
		_id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));

	// console.log(products, 'products');

	useEffect(() => {
		if (setHeader) {
			setHeader((prev) => ({
				...prev,
				product: names[0]._id,
			}));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<fieldset name='product-list'>
			<h6>Product</h6>
			<SelectInput
				name={name}
				options={names}
				value='_id'
				onChange={(e) =>
					setHeader
						? setHeader((prev) => ({
								...prev,
								product: e.target.value,
						  }))
						: null
				}
				defaultLanguage='en'
				classes={classes}
			/>
		</fieldset>
	);
};

export default Product;
