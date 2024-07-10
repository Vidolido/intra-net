// state/components
import { saveTemplateId } from '@/serverActions/laboratoryAnalyses/saveTemplateId';

// components
import SelectInput from '../../inputs/SelectInput';

const TemplateVersion = ({ templates, analysisId }) => {
	let mutTemplates = templates.map((template, index) => ({
		index,
		id: template._id,
		template: template.template,
	}));
	// const handleChange = () => {};

	return (
		<fieldset
			name='template-version'
			className='flex gap-4 items-center justify-between border rounded p-1'>
			<h6>Template Version</h6>

			<SelectInput
				name='templateVersion'
				property='id'
				value={'index'}
				none={true}
				options={mutTemplates}
				onChange={(e) => saveTemplateId(e.target.value, analysisId)}
				defaultLanguage='en'
			/>
		</fieldset>
	);
};

export default TemplateVersion;
