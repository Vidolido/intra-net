// components
import SelectInput from '../inputs/SelectInput';

const TemplateVersion = ({ onChange, templates }) => {
	let options = templates.map((template, index) => ({
		index,
		id: template._id,
		template: template.template,
	}));
	// console.log(options, 'the options');
	return (
		<fieldset
			name='sample-types'
			className='flex gap-4 items-center justify-between border rounded p-1'>
			<h6>Template Verion</h6>

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
