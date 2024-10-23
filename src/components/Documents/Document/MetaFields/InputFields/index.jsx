'use client';

import { useState } from 'react';
// components
import SingleInputField from './SingleInputField';
import SelectInput from '@/components/reusable/SelectInput';
// import SelectInput from '@/components/inputs/SelectInput';

const InputFields = ({
	languages,
	customers,
	documentInfo,
	handleAdditionalInfo,
	handleDocumentMeta,
	isTestReport,
	isCertificate,
	documentHeader,
	productAliases,
}) => {
	const [resetComponents, setResetComponents] = useState({
		submit: false,
		add: false,
		collections: false,
	});
	let isSampleCheked =
		documentInfo.meta != null &&
		documentInfo?.meta.find((field) => field.name.en === 'Sample')?.checked;

	let alias = productAliases.find(
		(alias) => alias.product._id.toString() === documentHeader.product
	);
	const handleFieldData = (data, dataObj) => {
		// console.log(data, dataObj);
		const { id, name } = dataObj;
		if (name && name === 'customer') {
			let customer = customers.find((c) => c._id === data);

			handleAdditionalInfo({ customer });
		}
		if (name && name === 'alias') {
			let foundAlias = alias.aliases.find((c) => c._id === data);

			handleAdditionalInfo(foundAlias);
		}
	};

	return (
		<fieldset name='document-fields'>
			<ul className='px-1'>
				{(isTestReport || isCertificate) && (
					<>
						<li>
							<span className='block'>Customer</span>
							<SelectInput
								defaultLanguage={languages[0].language}
								data={{
									state: customers,
									selectName: 'customer',
									classes: 'flex flex-col items-start bg-white px-[2px] w-full',
									showEmptyOption: true,
								}}
								extractData={handleFieldData}
								reset={{
									resetData: resetComponents,
									setReset: setResetComponents,
									resetType: 'submit',
								}}
							/>
						</li>
						{isSampleCheked && (
							<li>
								<span className='block'>Sample</span>
								<SelectInput
									defaultLanguage={languages[0].language}
									data={{
										state: alias.aliases,
										defaultValue: alias.aliases[0]._id.toString(),
										selectName: 'alias',
										classes:
											'flex flex-col items-start bg-white px-[2px] w-full',
									}}
									extractData={handleFieldData}
									reset={{
										resetData: resetComponents,
										setReset: setResetComponents,
										resetType: 'submit',
									}}
								/>
							</li>
						)}
					</>
				)}

				{documentInfo?.meta?.length > 0 &&
					documentInfo?.meta.map((field) => {
						if (field.name.en === 'Sample') return;
						return (
							field.checked && (
								<SingleInputField
									key={field._id}
									languages={languages}
									field={field}
									documentInfo={documentInfo}
									handleDocumentMeta={handleDocumentMeta}
								/>
							)
						);
					})}
			</ul>
		</fieldset>
	);
};

export default InputFields;
