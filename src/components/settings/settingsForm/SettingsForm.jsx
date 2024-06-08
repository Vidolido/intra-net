// state/actions
import { getLanguages } from '@/app/dashboard/apiCalls';
// import { createSetting } from '@/serverActions/settings';

// components
import SubmitButton from '@/components/buttons/SubmitButtons';
import SelectInput from '@/components/inputs/SelectInput';
import InputType from '@/components/inputs/InputType';
import LanguageInputContainer from '@/components/inputs/LanguageInputContainer';
import ParentForm from './ParentForm';
import OptionsSchema from './OptionsSchema';
import AddCollections from './AddCollections';
import FormCollections from './FormCollections';

const sectors = [
	{ name: 'Laboratory' },
	{ name: 'Oil Movement' },
	{ name: 'Administration' },
];
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const SettingsForm = async ({ setting }) => {
	const { optionsSchema } = setting;
	const { languages } = await getLanguages();

	const defaultLanguage = await languages.filter(
		(lang) => lang.language === 'en'
	)[0];

	let parameter = optionsSchema?.parameter;

	let singular = parameter?.name?.singular
		? Object.entries(parameter.name.singular).map(([key, value]) => ({
				[`main-singular-languages-${[key]}`]: value,
		  }))
		: [];

	let plural = parameter?.name?.plural
		? Object.entries(parameter.name.plural).map(([key, value]) => ({
				[`main-plural-languages-${[key]}`]: value,
		  }))
		: [];
	return (
		<ParentForm setting={setting}>
			<fieldset className='flex gap-[1px] bg-slate-100 border-[1px] border-slate-100 p-[1px] rounded'>
				<label className='flex flex-col items-start bg-white p-1'>
					<span>Sector</span>
					<SelectInput
						name='sector'
						options={sectors}
						label='name'
						value='name'
						defaultValue={setting.sector}
					/>
				</label>
				<label className='flex flex-col bg-white w-full p-1'>
					<span>Setting Name</span>
					<InputType
						type='text'
						name='settingName'
						defaultValue={setting.settingName}
					/>
				</label>
			</fieldset>
			<div className='flex flex-col gap-1 bg-slate-100 border-[1px] border-slate-100 p-[1px] rounded'>
				<OptionsSchema setting={setting}>
					<fieldset name='option-schema-main'>
						<div className='border border-slate-300 rounded p-1'>
							<h5>Main parameter</h5>
							<div className='flex gap-2'>
								<LanguageInputContainer
									fieldSetClass='flex flex-col'
									label={'Singular'}
									labelClass=''
									languages={languages}
									name={'main-singular'}
									defaultLanguage={defaultLanguage}
									inputs={!singular.length ? null : singular}
								/>
								<LanguageInputContainer
									fieldSetClass='flex flex-col'
									label={'Plural'}
									languages={languages}
									name={'main-plural'}
									defaultLanguage={defaultLanguage}
									inputs={!plural.length ? null : plural}
								/>
							</div>
						</div>
					</fieldset>
					<div className='flex flex-col gap-1'>
						<fieldset
							name='option-schema-add'
							className='border border-slate-300 rounded p-1'>
							<h5>Add Collections</h5>
							<AddCollections
								languages={languages}
								defaultLanguage={defaultLanguage}
								setting={setting}
							/>
						</fieldset>
						<fieldset
							name='option-schema-options'
							className='border border-slate-300 rounded p-1'>
							<h5>Collections</h5>
							<FormCollections
								languages={languages}
								defaultLanguage={defaultLanguage}
								setting={setting}
							/>
						</fieldset>
					</div>
					{/* <SaveOptionSchema /> */}
					<SubmitButton label='Use Schema' />
				</OptionsSchema>
			</div>
		</ParentForm>
	);
};

export default SettingsForm;
