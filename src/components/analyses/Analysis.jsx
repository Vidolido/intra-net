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
	console.log(analysis.template, 'the analysis');
	const template = templates.find(
		(template) => template._id === analysis.template
	);
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
				<SelectFields fields={fields.settings} analysisId={analysis._id} />
			</div>
			<TemplateForm
				template={template?.template}
				languages={languages}
				settings={settings}
			/>
		</div>
	);
};

export default Analysis;
