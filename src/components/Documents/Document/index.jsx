'use client';
import { Suspense } from 'react';

// state/actions
import {
	filterByLinkedSetting,
	sortFieldsByOrder,
} from '@/utils/documents/mutateFields';

// components
// import SelectFields from './MetaFields';
import TemplateForms from './TemplateForms';
import MetaFields from './MetaFields';

const metaFieldsState = (document, fields, laboratoryNumber) => {
	console.log('ova ide');
	let state = {
		customer: {},
		sample: {},
		meta: [],
	};

	if (document?.documentInfo?.meta?.length > 0) {
		// console.log('!document.documentInfo.meta');
		state = { ...document.documentInfo };
	} else {
		let sampleField = fields.find((field) => field.name.en === 'Sample');
		// console.log(sampleField, 'SAMPLE FIELD');
		if (sampleField) {
			state.sample = sampleField;
		}
		let labNumberField = fields.find(
			(field) => field.name.en === 'Laboratory Number'
		);
		if (labNumberField) {
			labNumberField = { ...labNumberField, value: laboratoryNumber };

			state.meta = fields.map((field) =>
				field.name.en === 'Laboratory Number' ? labNumberField : field
			);
		}

		state.meta = fields.map((field) =>
			field.name.en === 'Laboratory Number' ? labNumberField : field
		);
		// if (document.documentMeta) state.documentMeta = document.documentMeta;
		// if (document.additionalDocumentInfo)
		// 	state.additionalDocumentInfo = document.additionalDocumentInfo;
		// if (!document?.documentMeta?.length && !document.additionalDocumentInfo) {
		// 	let sampleField = fields.find((field) => field.name.en === 'Sample');
		// 	if (sampleField) {
		// 		state.additionalDocumentInfo.sample = sampleField;
		// 	}
		// 	let labNumberField = fields.find(
		// 		(field) => field.name.en === 'Laboratory Number'
		// 	);
		// 	if (labNumberField) {
		// 		labNumberField = { ...labNumberField, value: laboratoryNumber };

		// 		state.documentMeta = fields.map((field) =>
		// 			field.name.en === 'Laboratory Number' ? labNumberField : field
		// 		);
		// 	}
		// }
	}
	return state;
};

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
	let mutFields = filterByLinkedSetting(settings.fields, [
		document?.header?.documentType,
		'other',
	]);

	const sortedByOrder = sortFieldsByOrder(mutFields);

	const createMetaState = metaFieldsState(
		document,
		sortedByOrder,
		laboratoryNumber
	);

	return (
		<Suspense fallback={<h4>Loading...</h4>}>
			<div className='flex gap-6 pr-3'>
				<div className='flex flex-col gap-1 shrink'>
					<MetaFields
						languages={languages}
						customers={customers}
						initState={createMetaState}
						document={document}
						laboratoryNumber={laboratoryNumber}
						documentTypes={settings.documentTypes}
						productAliases={productAliases}
					/>
				</div>
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
