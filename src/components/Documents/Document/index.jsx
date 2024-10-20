'use client';
import { Suspense } from 'react';

// state/actions
import {
	filterByLinkedSetting,
	sortFieldsByOrder,
} from '@/utils/documents/mutateFields';

// components
import SelectFields from './SelectFields';
import TemplateForms from './TemplateForms';

const Document = ({
	customers,
	document,
	laboratoryNumber,
	settings,
	productAliases,
	languages,
	laboratorySettings,
	templates,
}) => {
	const hasSelectedTemplate = !document?.templateId ? true : false;
	// console.log(settings.fields);
	let mutFields = filterByLinkedSetting(settings.fields, [
		document?.header?.documentType,
		'other',
	]);

	// console.log(mutFields, 'mutFields');

	// const newFieldsCheckedStatus =
	// 	document.basicInfo &&
	// 	mutFields.map((field) => {
	// 		const isChecked = document.basicInfo.fields.some(
	// 			(f) => f._id === field._id
	// 		);
	// 		return { ...field, checked: isChecked };
	// 	});

	// const sortedByOrder = sortFieldsByOrder(
	// 	document.basicInfo != undefined ? newFieldsCheckedStatus : mutFields
	// );
	const sortedByOrder = sortFieldsByOrder(mutFields);
	// console.log(sortedByOrder, 'sortedByOrder');
	// console.log(settings, 'settings');
	// console.log(productAliases, 'productAliases');

	return (
		<Suspense fallback={<h4>Loading...</h4>}>
			<div className='flex gap-6 pr-3'>
				{!hasSelectedTemplate && (
					<div className='flex flex-col gap-1 shrink'>
						<SelectFields
							languages={languages}
							customers={customers}
							fields={sortedByOrder}
							document={document}
							laboratoryNumber={laboratoryNumber}
							documentTypes={settings.documentTypes}
							productAliases={productAliases}
						/>
					</div>
				)}
				<div className='w-[80%]'>
					<TemplateForms
						document={document}
						languages={languages}
						settings={settings}
						laboratorySettings={laboratorySettings}
						templates={templates}
					/>
				</div>
			</div>
		</Suspense>
	);
};

export default Document;
