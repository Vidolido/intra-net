// state/actions
import { mutateTemplateSettings } from '@/utils/mutateTempalteSettings';

// components
import TemplateSelectForm from '../selectTemplate/TemplateSelectForm';
// import SelectFields from '../infoFields/SelectFields';
import TemplateForm from '../analysesTemplate/TemplateForm';
import IdentificationNumbers from './IdentificationNumbers';
import SelectFields from './SelectFields';

const Analysis = ({
	analysis,
	templateSettings,
	settings,
	languages,
	laboratorySettings,
	templates,
}) => {
	// let { products, types, countries, fields, identificationNumbers } =
	// 	mutateTemplateSettings(templateSettings);
	// console.log(analysis, 'the analysis');
	const template = templates.find(
		(template) => template._id === analysis.templateId
	);
	const analysisTemplate = !analysis.template ? null : analysis.template;
	// console.log(analysisTemplate, 'analisysTemplate');
	// console.log(settings.fields, 'OVIE fields');
	return (
		<div className='flex gap-6 pr-3'>
			<div className='flex flex-col gap-1 shrink'>
				<IdentificationNumbers
					languages={languages}
					analysis={analysis}
					identificationNumbers={settings?.identificationNumbers}
				/>
				<SelectFields fields={settings?.fields} analysis={analysis} />
				<TemplateSelectForm
					analysis={analysis}
					languages={languages}
					settings={settings}
					// products={products}
					// types={types}
					// countries={countries}
					templates={templates}
				/>
			</div>
			<div className='w-[60%]'>
				<TemplateForm
					templateId={analysis.templateId}
					template={analysisTemplate || template?.template}
					languages={languages}
					laboratorySettings={laboratorySettings}
					analysisId={analysis._id}
				/>
			</div>
		</div>
	);
};

export default Analysis;
