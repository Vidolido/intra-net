// state/actions
import { nameArray } from '@/utils/nameArray';
import { mutateTemplateSettings } from '@/utils/settings/mutateTempalteSettings';

// components
import DisplayDocument from '../DisplayDocument';
import { mutateForSelect } from '@/utils/helpers/mutateForSelect';

const SingleDateCollection = ({
	collection,
	templateSettings,
	// showOptions,
	// documentClasses,
}) => {
	let { products, types, countries } = mutateTemplateSettings(templateSettings);

	let settings = {
		products: mutateForSelect(products.settings),
		types: mutateForSelect(types.settings),
		origin: mutateForSelect(countries.settings),
	};

	return collection?.documents?.map((document) => (
		<DisplayDocument
			key={document._id}
			document={document}
			settings={settings}
			time={true}
			dateTime={false}
			// showOptions={showOptions}
			classes={'grid-cols-5'}
		/>
	));
};

export default SingleDateCollection;
