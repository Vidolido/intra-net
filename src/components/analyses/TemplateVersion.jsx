import React from 'react';
import SelectInput from '../inputs/SelectInput';

const TemplateVersion = ({ onChange, templates }) => {
	console.log(templates, 'templates in TEMPLATE VERSION');
	let options = templates.map((template) => ({
		id: template._id,
		template: template.template,
	}));
	console.log(options);
	return (
		<fieldset name='sample-types'>
			<h6>Template</h6>

			<SelectInput
				value='id'
				none={true}
				// options={}
				onChange={onChange}
				defaultLanguage='en'
			/>
		</fieldset>
	);
};

export default TemplateVersion;
