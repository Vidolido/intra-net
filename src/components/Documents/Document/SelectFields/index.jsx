'use client';
import { useEffect, useState } from 'react';

// state/actions
import { saveDocumentBasicInfo } from '@/data-access/documents/document/saveDocumentBasicInfo';

// components
import ContextButton from '@/components/buttons/ContextButton';
// import SingleField from './CheckBoxFields/SingleField';
import InputFields from './InputFIelds';
import CheckBoxFields from './CheckBoxFields';

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

	useEffect(() => {
		if (document?.basicInfo) {
			const newFieldsCheckedStatus = fields.map((field) => {
				const isChecked = document.basicInfo.fields.some(
					(f) => f._id === field._id
				);

				console.log(isChecked, 'THE DAMN IS CHEKED');

				return { ...field, checked: !isChecked ? field.checked : isChecked };
			});
			setFields(newFieldsCheckedStatus);
		}
	}, [document?.basicInfo]);

	// const handleHide = () => {
	// 	setVisible(!visible);
	// };

	// const handleChecked = (e) => {
	// 	let order = findHighestOrder(fields);
	// 	const newFields = fields.map((field) => {
	// 		if (field._id === e.target.value) {
	// 			!field.checked ? (field.checked = true) : (field.checked = false);
	// 			field.order = order + 1;
	// 		}
	// 		return field;
	// 	});
	// 	setFields(newFields);
	// };

	const handleClick = async (e) => {
		let selectFields = e.target.form.elements
			.namedItem('document-fields')
			.querySelectorAll('select');
		let inputFields = e.target.form.elements
			.namedItem('document-fields')
			.querySelectorAll('input');

		let merged = Array.from(selectFields).concat(Array.from(inputFields));

		const basicInfo = Array.from(merged).reduce(
			(acc, currentValue) => {
				if (currentValue.name === 'customer') {
					acc.customer = {
						customerId: currentValue.value,
					};
				} else {
					acc.fields.push({
						_id: currentValue.id,
						data: currentValue.value,
					});
				}
				return acc;
			},
			{ customer: {}, fields: [] }
		);

		// HANDLE ERRORS HERE
		// await saveFields(newFields, document._id);
		await saveDocumentBasicInfo(basicInfo, document._id);
	};

	return (
		<form className='bg-slate-100 border border-t-0 border-slate-200 rounded'>
			{/* <SelectFields /> */}
			<CheckBoxFields fields={fields} setFields={setFields} />
			<InputFields
				customers={customers}
				fields={fields}
				documentHeader={document.header}
				productAliases={productAliases}
				basicInfo={document?.basicInfo}
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
