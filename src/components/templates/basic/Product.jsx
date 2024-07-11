'use client';
import { useEffect } from 'react';

// state/actions
// import { ADD } from '@/state/actionTypes';
// import { useLaboratoryDispatchContext } from '@/state/laboratoryContext';
import { nameArray } from '@/utils/nameArray';

// components
import SelectInput from '@/components/inputs/SelectInput';

const Product = ({ languages, products, value, classes, name, setHeader }) => {
	// let dispatch = useLaboratoryDispatchContext();
	let names = products?.settings.map((setting) => ({
		_id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));

	useEffect(() => {
		if (setHeader)
			setHeader((prev) => ({
				...prev,
				product: names[0]._id,
			}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<fieldset name='product-list'>
			<h6>Product</h6>
			<SelectInput
				name={name}
				defaultLanguage={languages[0].language}
				options={names}
				label='en'
				defaultValue={value}
				onChange={(e) =>
					setHeader
						? setHeader((prev) => ({
								...prev,
								product: e.target.value,
						  }))
						: null
				}
				classes={classes}
			/>
		</fieldset>
	);
};

export default Product;
