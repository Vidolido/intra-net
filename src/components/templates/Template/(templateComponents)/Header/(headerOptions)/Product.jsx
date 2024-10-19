'use client';
import { useEffect } from 'react';

// state/actions
import { nameArray } from '@/utils/nameArray';
import SelectInput from '@/components/reusable/SelectInput';
import { mutateForSelect } from '@/utils/templates/mutateForSelect';

// components
// import SelectInput from '@/components/inputs/SelectInput';

const Product = ({
	products,
	defaultValue = null,
	languages,
	classes,
	setHeader,
}) => {
	let { settings } = products;
	let mutSettings = mutateForSelect(settings);

	useEffect(() => {
		if (setHeader) {
			setHeader((prev) => ({
				...prev,
				product: mutSettings[0]._id,
			}));
		}
	}, []);
	// console.log(settings, 'setting');
	return (
		<fieldset name='product-list'>
			<h6>Product</h6>
			<SelectInput
				defaultLanguage={languages[0].language}
				data={{
					state: mutSettings,
					selectName: 'product',
					defaultValue: !defaultValue ? mutSettings[0]._id : defaultValue,
					classes: 'flex flex-col items-start bg-white px-[2px] w-full',
				}}
				// extractData={handleSelection}
				// resetComponentData={resetComponentData}
				// setResetComponentData={setResetComponentData}
			/>
		</fieldset>
	);
};

export default Product;
