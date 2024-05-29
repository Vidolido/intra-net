import React from 'react';
import SelectInput from '../inputs/SelectInput';
import InputType from '../inputs/InputType';
import LanguageInputContainer from '../inputs/LanguageInputContainer';

// state/actions
import { getLanguages } from '@/app/dashboard/apiCalls';
import { createSetting } from '@/serverActions/settings';
import SubmitButton from '../buttons/SubmitButtons';

const sectors = [
	{ name: 'Laboratory' },
	{ name: 'Oil Movement' },
	{ name: 'Administration' },
];

const SettingsForm = async () => {
	const { languages } = await getLanguages();

	return (
		<form action={createSetting}>
			<h3>Settings Form</h3>
			<fieldset>
				<label>
					Sector
					<SelectInput
						name='sector'
						options={sectors}
						label='name'
						value='name'
					/>
				</label>
				<label>
					Setting Name
					<InputType type='text' name='settingName' />
				</label>
			</fieldset>
			<fieldset>
				<h4>Option schema</h4>
				<div>
					<h5>Main parameter</h5>
					<LanguageInputContainer
						languages={languages}
						label={'Singular'}
						name={'main-singular'}
					/>
					<LanguageInputContainer
						languages={languages}
						label={'Plural'}
						name={'main-plural'}
					/>
				</div>
			</fieldset>
			<SubmitButton label={'Create'} />
		</form>
	);
};

export default SettingsForm;
