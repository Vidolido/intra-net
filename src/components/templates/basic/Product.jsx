'use client';
import { useEffect } from 'react';
import { nameArray } from '@/utils/nameArray';

// components
import SelectInput from '@/components/inputs/SelectInput';
import { useLaboratoryDispatchContext } from '@/state/laboratoryContext';
import { ADD } from '@/state/actionTypes';

const Product = ({
	languages,
	products,
	onChange,
	value,
	classes,
	name,
	// dispatch,
}) => {
	let dispatch = useLaboratoryDispatchContext();
	let names = products?.settings.map((setting) => ({
		id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));

	useEffect(() => {
		if (dispatch) {
			dispatch({
				type: ADD,
				payload: {
					state: 'header',
					value: { product: names[0].id },
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	console.log(names, 'names');
	return (
		<fieldset name='product-list'>
			<h6>Product</h6>
			{/* <SelectInput options={productsList} value='type' /> */}
			<SelectInput
				name={name}
				defaultLanguage={languages[0].language}
				options={names}
				label='en'
				onChange={onChange}
				defaultValue={value}
				classes={classes}
			/>
		</fieldset>
	);
};

export default Product;
