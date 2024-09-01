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
	settings,
	languages,
	laboratorySettings,
	templates,
}) => {
	const template = templates.find(
		(template) => template._id === analysis.templateId
	);
	const analysisTemplate = !analysis.template ? null : analysis.template;

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
