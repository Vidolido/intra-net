import { mutateTemplateSettings } from '@/utils/mutateTempalteSettings';
import DisplayDocument from './DisplayDocument';
import { nameArray } from '@/utils/nameArray';

const Unsorted = ({ document, templateSettings }) => {
	console.log(document, 'the document');

	let { products, types, countries } = mutateTemplateSettings(templateSettings);

	let mutProducts = products?.settings?.map((setting) => ({
		id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));
	let mutTypes = types?.settings?.map((setting) => ({
		id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));
	let mutCountries = countries?.settings?.map((setting) => ({
		id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));
	return (
		<DisplayDocument
			document={document}
			products={mutProducts}
			types={mutTypes}
			countries={mutCountries}
			dateTime={true}
		/>
	);
};

export default Unsorted;
