// components
import SelectInput from '../inputs/SelectInput';

const TemplateVersion = ({ onChange, templates }) => {
	let options = templates.map((template, index) => ({
		index,
		id: template._id,
		template: template.template,
	}));
	return (
		<fieldset name='sample-types'>
			<h6>Template</h6>

			<SelectInput
				name='templateVersion'
				property='id'
				value={'index'}
				none={true}
				options={options}
				onChange={onChange}
				defaultLanguage='en'
			/>
		</fieldset>
	);
};

export default TemplateVersion;
