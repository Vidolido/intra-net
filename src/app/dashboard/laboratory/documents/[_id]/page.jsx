// state/actions
import { SingleDocumentContextProvider } from '@/state/laboratory/documents/singleDocument/singleDocumentContext';
import { getLaboratorySettings, getLanguages } from '@/app/dashboard/apiCalls';
import { getCustomers, getDocumentById } from '../../apiCalls';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';
import { mutateTemplateSettings } from '@/utils/settings/mutateTempalteSettings';
import { findSettingType } from '@/utils/findSettingType';

// components
import SingleDocument from '@/components/Documents/SingleDocument';
import SideBar from '@/components/Documents/SingleDocument/SideBar';
import { filterTypes } from '@/utils/settings/filterTypes';

// Don't know if i need them
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async ({ params }) => {
	let { _id } = params;
	const { languages } = await getLanguages();
	const { templateSettings } = await getTemplateSettings();

	const { customers } = await getCustomers();

	const { document } = await getDocumentById(_id);

	const { setting } = await getLaboratorySettings();
	const { settings: laboratorySettings } = setting || [];

	const { products, types, fields, countries } =
		mutateTemplateSettings(templateSettings);

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
	// let productAliases = products.settings.map((setting) => ({
	// 	_id: setting._id,
	// 	aliases: setting.collections.find(
	// 		(collection) => collection.name.en === 'Aliases'
	// 	).items,
	// }));

	// let documentTypes = findSettingType(types.settings, ['document']);
	let documentTypes = filterTypes(types.settings, ['document']);

	return (
		<SingleDocumentContextProvider>
			<SingleDocument
				customers={customers}
				document={document}
				documentTypes={documentTypes}
				products={products}
				productAliases={productAliases}
				fields={fields}
				laboratorySettings={laboratorySettings}
				languages={languages}
			/>
			<SideBar
				document={document}
				laboratorySettings={laboratorySettings}
				languages={languages}
			/>
		</SingleDocumentContextProvider>
	);
};

export default page;
