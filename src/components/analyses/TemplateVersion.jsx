import React from 'react';
import SelectInput from '../inputs/SelectInput';

const TemplateVersion = ({ onChange }) => {
	return (
		<fieldset name='sample-types'>
			<h6>Template</h6>

			<SelectInput
				value='id'
				none={true}
				onChange={onChange}
				defaultLanguage='en'
			/>
		</fieldset>
	);
};

export default TemplateVersion;
