import { Suspense } from 'react';

// state/actions
import {
	getCustomers,
	getDocumentById,
	getLaboratoryDocumentNumber,
	getLaboratoryTemplates,
} from '../../../apiCalls';
import { getLanguages, getSettings } from '@/app/dashboard/apiCalls';
import { filterTypes } from '@/utils/settings/filterTypes';
import { mutateTemplateSettings } from '@/utils/settings/mutateTempalteSettings';
import { mutateFields } from '@/utils/documents/mutateFields';
import { mutateForSelect } from '@/utils/helpers/mutateForSelect';

// components
import Document from '@/components/Documents/Document';
import TemplateSelectForm from '@/components/Documents/Document/TemplateForms/TemplateSelectForm';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async ({ params }) => {
	const { _id } = params;
	const { customers } = await getCustomers();

	// let { templateSettings } = await getTemplateSettings();
	const { settings: templateSettings } = await getSettings({
		documentStatus: 'published',
		isDeleted: false,
	});
	let { languages } = await getLanguages();
	let { templates } = await getLaboratoryTemplates({
		documentStatus: 'published',
	});

	const { document } = await getDocumentById(_id);

	const { laboratoryNumber } = document?.header
		? await getLaboratoryDocumentNumber({
				documentType: document?.header?.documentType,
		  })
		: '';

	let { products, types, countries, fields, laboratorySettings } =
		await mutateTemplateSettings(templateSettings);
	const sampleTypes = filterTypes(types.settings, 'sample');
	const documentTypes = filterTypes(types.settings, 'document');

	const settings = {
		products: mutateForSelect(products.settings),
		sampleTypes: mutateForSelect(sampleTypes),
		documentTypes: mutateForSelect(documentTypes),
		countries: mutateForSelect(countries.settings),
		fields: mutateFields(fields),
	};

	const aliasesId = products.optionsSchema.collections.find(
		(coll) => coll.name.en === 'Aliases'
	)._id;

	let productAliases = products.settings.reduce((acc, currentValue) => {
		let aliases = Object.entries(currentValue.collections).find(
			(coll) => coll[0] === aliasesId
		);
		acc.push({
			product: {
				_id: currentValue._id,
				name: currentValue.parameter,
			},
			aliases: aliases[1].map((alias) => ({
				_id: alias._id,
				name: alias.value,
			})),
		});
		return acc;
	}, []);
	let hasSelectedTemplate = !document?.templateId ? false : true;

	return (
		<div className='w-full'>
			<h2>Draft Document</h2>
			<Suspense fallback={<h2>Loading...</h2>}>
				{!hasSelectedTemplate ? (
					<TemplateSelectForm
						document={document}
						languages={languages}
						settings={settings}
						templates={templates}
					/>
				) : (
					<>
						<Document
							customers={customers}
							document={document}
							laboratoryNumber={laboratoryNumber}
							settings={settings}
							productAliases={productAliases}
							languages={languages}
							laboratorySettings={laboratorySettings}
							templates={templates}
						/>
					</>
				)}
			</Suspense>
		</div>
	);
};

export default page;
