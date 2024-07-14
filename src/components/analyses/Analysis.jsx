// state/actions
import { mutateTemplateSettings } from '@/utils/mutateTempalteSettings';

// components
import TemplateSelectForm from './selectTemplate/TemplateSelectForm';
import SelectFields from './infoFields/SelectFields';
import TemplateForm from './analysesTemplate/TemplateForm';

const Analysis = ({
	analysis,
	templateSettings,
	languages,
	settings,
	templates,
}) => {
	let { products, types, countries, fields } =
		mutateTemplateSettings(templateSettings);
	console.log(analysis, 'the analysis');
	const template = templates.find(
		(template) => template._id === analysis.templateId
	);
	const analysisTemplate = !analysis.template ? null : analysis.template;
	console.log(analysisTemplate, 'analisysTemplate');

	return (
		<div className='flex'>
			<div>
				<TemplateSelectForm
					analysis={analysis}
					languages={languages}
					products={products}
					types={types}
					countries={countries}
					templates={templates}
				/>
				<SelectFields fields={fields.settings} analysis={analysis} />
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
