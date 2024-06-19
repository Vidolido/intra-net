// functions
import { mutateTemplateSettings } from '@/utils/mutateTempalteSettings';

// state/actions
import { LaboratoryContextProvider } from '@/state/laboratoryContext';

// components
import TemplateSelect from './TemplateSelect';
import Fields from './Fields';
import BasicInputFields from './BasicInputFields';
import AnalysisTemplate from './AnalysisTemplate';

const AnalysesForm = ({ templateSettings, languages, allTemplates }) => {
	let { products, types, countries, fields } =
		mutateTemplateSettings(templateSettings);
	return (
		<form>
			<LaboratoryContextProvider>
				<div>
					<TemplateSelect
						languages={languages}
						products={products}
						types={types}
						countries={countries}
						templates={allTemplates}
					/>

					<Fields languages={languages} fields={fields.settings} />
					<BasicInputFields />
				</div>

				<div>
					<AnalysisTemplate templates={allTemplates} />
				</div>
			</LaboratoryContextProvider>
		</form>
	);
};

export default AnalysesForm;
