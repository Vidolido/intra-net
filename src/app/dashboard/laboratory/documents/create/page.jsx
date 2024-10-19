import { Suspense } from 'react';

// state/actions
import {
	getCustomers,
	getDocumentById,
	getDraftDocument,
	getLaboratoryDocumentNumber,
	getLaboratoryTemplates,
} from '../../apiCalls';
import {
	getLaboratorySettings,
	getLanguages,
	getSettings,
} from '@/app/dashboard/apiCalls';
import { mutateTemplateSettings } from '@/utils/settings/mutateTempalteSettings';
import { findSettingType } from '@/utils/findSettingType';
import { mutateFields } from '@/utils/documents/mutateFields';
import { nameArray } from '@/utils/nameArray';

// components
import Document from '@/components/Documents/Document';
// import { useSearchParams } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const mutSettings = (settings) =>
	settings?.map((s) => ({
		_id: s._id,
		...nameArray(s.parameter.inputValue),
	}));

const page = async ({ searchParams }) => {
	const { _id } = searchParams;
	const { customers } = await getCustomers();

	const { settings: templateSettings } = await getSettings({
		documentStatus: 'published',
		isDeleted: false,
	});

	let { languages } = await getLanguages();
	let { templates: published } = await getLaboratoryTemplates({
		documentStatus: 'published',
	});

	const { setting } = await getLaboratorySettings();
	const { settings: laboratorySettings } = setting || [];

	// const { draft } = await getDraftDocument();
	const { document: draft } = await getDocumentById(_id);

	const { laboratoryNumber } = draft?.header
		? await getLaboratoryDocumentNumber({
				documentType: draft?.header?.documentType,
		  })
		: '';

	let { products, types, countries, fields } = await mutateTemplateSettings(
		templateSettings
	);

	let sampleTypes = findSettingType(types.settings, ['sample']);
	let documentTypes = findSettingType(types.settings, ['document']);

	let settings = {
		products: mutSettings(products.settings),
		sampleTypes: mutSettings(sampleTypes),
		documentTypes: mutSettings(documentTypes),
		countries: mutSettings(countries.settings),
		fields: mutateFields(fields.settings),
	};

	let productAliases = products.settings.map((setting) => ({
		_id: setting._id,
		aliases: setting.collections.find(
			(collection) => collection.name.en === 'Aliases'
		).items,
	}));

	return (
		<div className='w-full'>
			<h2>Create New Document</h2>
			<Suspense fallback={<h2>Loading...</h2>}>
				<Document
					customers={customers}
					document={draft}
					laboratoryNumber={laboratoryNumber}
					settings={settings}
					productAliases={productAliases}
					languages={languages}
					laboratorySettings={laboratorySettings}
					templates={published}
				/>
			</Suspense>
		</div>
	);
};

export default page;
