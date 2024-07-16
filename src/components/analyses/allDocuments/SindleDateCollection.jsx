// state/actions
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';
import { orderDocumentsByProduct } from '@/utils/analyses/orderDocumentsByProduct';
import { nameArray } from '@/utils/nameArray';
import Ordered from '../documentsPage/Ordered';

const SindleDateCollection = async ({ collection }) => {
	const { templateSettings } = await getTemplateSettings();

	let products = templateSettings.filter(
		(setting) => setting.settingName === 'Products'
	);

	let items = products[0]?.settings?.map((setting) => ({
		id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));

	const mutDocuments = orderDocumentsByProduct(collection.documents, items);

	return mutDocuments.map((document) =>
		document.items.length > 0 ? (
			<Ordered
				key={document.id}
				document={document}
				templateSettings={templateSettings}
			/>
		) : null
	);
};

export default SindleDateCollection;
