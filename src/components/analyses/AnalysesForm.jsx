// state/actions
import { LaboratoryContextProvider } from '@/state/laboratoryContext';
import { mutateTemplateSettings } from '@/utils/mutateTempalteSettings';

// components
import TemplateSelect from './TemplateSelect';
import Fields from './Fields';
import BasicInputFields from './BasicInputFields';
import AnalysisTemplate from './AnalysisTemplate';

const AnalysesForm = ({ templateSettings, languages, templates }) => {
	let { products, types, countries, fields } =
		mutateTemplateSettings(templateSettings);
	return (
		<form className='flex'>
			<LaboratoryContextProvider>
				<div className='bg-slate-100 border-2 rounded p-1'>
					<TemplateSelect
						languages={languages}
						products={products}
						types={types}
						countries={countries}
						templates={templates}
					/>

					<Fields languages={languages} fields={fields.settings} />
					<BasicInputFields />
				</div>

				<div>
					<AnalysisTemplate templates={templates} />
				</div>
			</LaboratoryContextProvider>
		</form>
	);
};

export default AnalysesForm;
