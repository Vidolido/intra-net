'use client';
import { useEffect } from 'react';

// state/actions
import { ADD } from '@/state/actionTypes';
import { useLaboratoryDispatchContext } from '@/state/laboratoryContext';
import { nameArray } from '@/utils/nameArray';

// components
import SelectInput from '@/components/inputs/SelectInput';

const Product = ({ languages, products, onChange, value, classes, name }) => {
	let dispatch = useLaboratoryDispatchContext();
	let names = products?.settings.map((setting) => ({
		id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));

	useEffect(() => {
		if (dispatch != undefined) {
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

	//   console.log(dispatch, 'THE DISPATCH');

	return (
		<fieldset name='product-list'>
			<h6>Product</h6>
			<SelectInput
				name={name}
				defaultLanguage={languages[0].language}
				options={names}
				label='en'
				defaultValue={value}
				onChange={onChange}
				classes={classes}
			/>
		</fieldset>
	);
};

export default Product;
