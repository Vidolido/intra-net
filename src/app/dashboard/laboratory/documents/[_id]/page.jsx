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

	let productAliases = products.settings.map((setting) => ({
		_id: setting._id,
		aliases: setting.collections.find(
			(collection) => collection.name.en === 'Aliases'
		).items,
	}));

	let documentTypes = findSettingType(types.settings, ['document']);

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
