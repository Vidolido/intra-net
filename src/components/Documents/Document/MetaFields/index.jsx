'use client';
import { useState } from 'react';

// state/actions
import { saveDocumentBasicInfo } from '@/data-access/documents/document/saveDocumentBasicInfo';

// components
import InputFields from './InputFIelds';
import CheckBoxFields from './CheckBoxFields';
import ContextButton from '@/components/buttons/ContextButton';

// RENAME THIS TO META FIELDS
const MetaFields = ({
	languages,
	customers,
	initState,
	document,
	laboratoryNumber,
	documentTypes,
	productAliases,
}) => {
	const [documentInfo, setDocumentInfo] = useState(() => initState);

	const handleCheck = (documentMeta) => {
		setDocumentInfo((prev) => ({
			...prev,
			meta: documentMeta,
		}));
	};

	const handleAdditionalInfo = (additionalInfo) => {
		setDocumentInfo((prev) => ({
			...prev,
			...additionalInfo,
		}));
	};
	const handleDocumentMeta = (documentMeta) => {
		setDocumentInfo((prev) => ({
			...prev,
			meta: documentMeta,
		}));
	};

	const handleClick = async (e) => {
		// console.log(documentInfo, 'DOCUMENT INFO  IN SUBMIT');
		// // HANDLE ERRORS HERE
		await saveDocumentBasicInfo(documentInfo, document._id);
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
				documentMeta={documentInfo?.meta}
				handleCheck={handleCheck}
			/>
			<InputFields
				languages={languages}
				customers={customers}
				documentInfo={documentInfo}
				handleAdditionalInfo={handleAdditionalInfo}
				handleDocumentMeta={handleDocumentMeta}
				isTestReport={isTestReport}
				isCertificate={isCertificate}
				documentHeader={document.header}
				laboratoryNumber={laboratoryNumber}
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

export default MetaFields;
