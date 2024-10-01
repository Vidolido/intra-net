'use client';
import { useState } from 'react';

// state/actions
import { saveFields } from '@/data-access/documents/document/saveFields';
import { mutateFields } from '@/utils/mutateFields';

// components
import ArrowSvg from '@/../public/arrow.svg';
import ContextButton from '@/components/buttons/ContextButton';
import SingleField from './SingleField';
import InputFields from './InputFIelds';

function findHighestOrder(arr) {
	return arr.reduce((max, obj) => {
		return obj.order !== undefined && obj.order > max ? obj.order : max;
	}, 0);
}

// function filterByLink(arrayOfObjects, linkValue) {
//   return arrayOfObjects.filter(
//     (obj) => obj.links.includes('other') || obj.links.includes(linkValue)
//   );
// }

function setChecked() {}

function filterByLinkedSetting(fields, linkedSettings) {
	return fields.filter((field) =>
		linkedSettings.some((link) => field.links.includes(link))
	);
}

function setCheckedStatus(fields, linkedSettings) {
	return fields.reduce((acc, currentValue) => {
		if (currentValue.links.includes(linkedSettings))
			currentValue.checked = true;
		else currentValue.checked = false;
		acc.push(currentValue);
		return acc;
	}, []);
}

const SelectFields = ({
	customers,
	fields: dbFields,
	document,
	documentTypes,
	products,
	productAliases,
}) => {
	const fieldsInitState = () => {
		let mutFields = filterByLinkedSetting(dbFields, [
			document.header.documentType,
			'other',
		]);
		return setCheckedStatus(mutFields, document.header.documentType);
	};
	const [visible, setVisible] = useState(false);

	const [fields, setFields] = useState(fieldsInitState);
	const handleHide = () => {
		setVisible(!visible);
	};

	const handleChecked = (e) => {
		let order = findHighestOrder(fields);
		const newFields = fields.map((field) => {
			if (field._id === e.target.value) {
				!field.checked ? (field.checked = true) : (field.checked = false);
				field.order = order + 1;
			}
			return field;
		});
		setFields(newFields);
	};

	const handleClick = async (e) => {
		// e.target.form.preventDefault();

		let selectFields = e.target.form.elements
			.namedItem('document-fields')
			.querySelectorAll('select');
		let inputFields = e.target.form.elements
			.namedItem('document-fields')
			.querySelectorAll('input');

		let merge = Array.from(selectFields).concat(Array.from(inputFields));
		// console.log(selectFields, 'selectFields selectFields selectFields');
		// console.log(inputFields, 'inputFields inputFields inputFields');
		console.log(merge, 'merge merge merge');

		let newFields = Array.from(inputFields).reduce((acc, currentValue) => {
			let field = fields.find((field) => field._id === currentValue.name);
			field.value = currentValue.value;
			if (acc.find((e) => e._id === currentValue.name)) {
				acc.find((e) => e._id === currentValue.name).value = currentValue.value;
			} else {
				acc.push(field);
			}
			return acc;
		}, []);

		// HANDLE ERRORS HERE
		await saveFields(newFields, document._id);
	};

	// console.log(products, 'the products');

	return (
		<form className='bg-slate-100 border border-t-0 border-slate-200 rounded'>
			<fieldset className='bg-white border border-slate-200 pl-1 rounded'>
				<button type='button' onClick={handleHide} className='relative w-full'>
					<h3 className='text-left'>Fields</h3>
					<ArrowSvg
						className={`w-[22px] h-[22px] absolute right-1 top-[3px] fill-red-500 hover:fill-red-300 ${
							visible ? '' : 'rotate-180'
						}`}
					/>
				</button>
				<fieldset
					className={`grid grid-cols-2 ${!visible ? 'hidden' : 'visible'}`}>
					{fields.length > 0
						? fields.map((field) => (
								<SingleField
									key={field._id}
									field={field}
									onChange={handleChecked}
								/>
						  ))
						: null}
				</fieldset>
			</fieldset>

			<InputFields
				customers={customers}
				fields={fields}
				documentHeader={document.header}
				productAliases={productAliases}
			/>
			<div className='p-1'>
				<ContextButton
					label='Save'
					type='edit'
					onClick={handleClick}
					classes='w-full'
				/>
			</div>
		</form>
	);
};

export default SelectFields;
