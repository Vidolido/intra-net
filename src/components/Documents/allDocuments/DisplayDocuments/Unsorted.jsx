// state/actions
import { mutateTemplateSettings } from '@/utils/settings/mutateTempalteSettings';
import { mutateForSelect } from '@/utils/helpers/mutateForSelect';

// components
import DisplayDocument from '../DisplayDocument';

const Unsorted = ({ document, templateSettings }) => {
	let { products, types, countries } = mutateTemplateSettings(templateSettings);

	let settings = {
		products: mutateForSelect(products.settings),
		types: mutateForSelect(types.settings),
		origin: mutateForSelect(countries.settings),
	};

	return (
		<DisplayDocument
			document={document}
			settings={settings}
			time={false}
			dateTime={true}
			classes='grid-cols-5'
		/>
	);
};

export default Unsorted;
