'use client';
import { useState } from 'react';

// state/actions
import { saveDocumentBasicInfo } from '@/data-access/documents/document/saveDocumentBasicInfo';

// components
import ContextButton from '@/components/buttons/ContextButton';
import InputFields from './InputFIelds';
import CheckBoxFields from './CheckBoxFields';

const SelectFields = ({
	languages,
	customers,
	fields: dbFields,
	document,
	laboratoryNumber,
	documentTypes,
	productAliases,
}) => {
	const [fields, setFields] = useState(dbFields);

	const handleClick = async (e) => {
		// let selectFields = e.target.form.elements
		// 	.namedItem('document-fields')
		// 	.querySelectorAll('select');
		// let inputFields = e.target.form.elements
		// 	.namedItem('document-fields')
		// 	.querySelectorAll('input');
		// let merged = Array.from(selectFields).concat(Array.from(inputFields));
		// const basicInfo = Array.from(merged).reduce(
		// 	(acc, currentValue) => {
		// 		if (!currentValue.id.length && currentValue.name !== 'customer')
		// 			return acc;
		// 		if (currentValue.name === 'customer') {
		// 			acc.customer = {
		// 				customerId: currentValue.value,
		// 			};
		// 		} else {
		// 			acc.fields.push({
		// 				_id: currentValue.id,
		// 				data: currentValue.value,
		// 			});
		// 		}
		// 		return acc;
		// 	},
		// 	{ customer: {}, fields: [] }
		// );
		// // HANDLE ERRORS HERE
		// await saveDocumentBasicInfo(basicInfo, document._id);
	};
	const isTestReport =
		documentTypes.find((type) => type._id === document.header.documentType).name
			.en === 'Test Report';
	const isCertificate =
		documentTypes.find((type) => type._id === document.header.documentType).name
			.en === 'Certificate';

	return (
		<form className='bg-slate-100 border border-t-0 border-slate-200 rounded'>
			<CheckBoxFields
				document={document}
				fields={fields}
				setFields={setFields}
			/>
			<InputFields
				languages={languages}
				customers={customers}
				fields={fields}
				isTestReport={isTestReport}
				isCertificate={isCertificate}
				documentHeader={document.header}
				laboratoryNumber={laboratoryNumber}
				productAliases={productAliases}
				basicInfo={document?.basicInfo}
				documentMeta={document?.documentMeta}
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
