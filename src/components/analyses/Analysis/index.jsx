// state/actions
import { mutateTemplateSettings } from '@/utils/mutateTempalteSettings';

// components
import TemplateSelectForm from '../selectTemplate/TemplateSelectForm';
import SelectFields from '../infoFields/SelectFields';
import TemplateForm from '../analysesTemplate/TemplateForm';
import IdentificationNumbers from './IdentificationNumbers';

const Analysis = ({
	analysis,
	templateSettings,
	languages,
	settings,
	templates,
}) => {
	let { products, types, countries, fields, identificationNumbers } =
		mutateTemplateSettings(templateSettings);
	// console.log(analysis, 'the analysis');
	const template = templates.find(
		(template) => template._id === analysis.templateId
	);
	const analysisTemplate = !analysis.template ? null : analysis.template;
	// console.log(analysisTemplate, 'analisysTemplate');

	return (
		<div className='flex gap-2'>
			<div className='flex flex-col gap-1'>
				<IdentificationNumbers
					languages={languages}
					analysis={analysis}
					identificationNumbers={identificationNumbers}
				/>
				<SelectFields fields={fields.settings} analysis={analysis} />
				<TemplateSelectForm
					analysis={analysis}
					languages={languages}
					products={products}
					types={types}
					countries={countries}
					templates={templates}
				/>
			</div>
			<TemplateForm
				templateId={analysis.templateId}
				template={analysisTemplate || template?.template}
				languages={languages}
				settings={settings}
				analysisId={analysis._id}
			/>
		</div>
	);
};

export default Analysis;
