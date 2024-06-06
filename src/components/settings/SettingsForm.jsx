// state/actions
import { getLanguages } from '@/app/dashboard/apiCalls';
// import { createSetting } from '@/serverActions/settings';

// components
import SelectInput from '../inputs/SelectInput';
import InputType from '../inputs/InputType';
import LanguageInputContainer from '../inputs/LanguageInputContainer';
import FormCollections from './FormCollections';
import SubmitButton from '../buttons/SubmitButtons';
import AddCollections from './AddCollections';
import SaveOptionSchema from './SaveOptionSchema';
import ParentForm from './ParentForm';
import ClientComp from './ClientComp';
import OptionsSchema from './OptionsSchema';

const sectors = [
	{ name: 'Laboratory' },
	{ name: 'Oil Movement' },
	{ name: 'Administration' },
];
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const SettingsForm = async ({ setting }) => {
	const { languages } = await getLanguages();
	const defaultLanguage = await languages.filter(
		(lang) => lang.language === 'en'
	)[0];
	// let test =
	// 	setting &&
	// 	Object?.entries(setting?.optionsSchema?.parameter?.name?.singular).map(
	// 		(item) => ({ [item[0]]: item[1] })
	// 	);
	// console.log(defaultLanguage, 'THE DEF LANG');
	console.log(setting, 'THE SETTINGGGGGGGGGGGGGGGGGGGGGGGGGG');
	console.log(setting.collections, 'the setting.collections');
	let parameter = (await setting.optionsSchema.parameter.name) || null;
	const singular =
		parameter &&
		Object.entries(parameter?.singular)?.map((name) => ({
			[name[0]]: name[1],
		}));
	const plural =
		parameter &&
		Object.entries(parameter?.plural)?.map((name) => ({
			[name[0]]: name[1],
		}));

	console.log(parameter, 'the parameter');
	console.log(singular, 'the singular');
	return (
		<ParentForm setting={setting}>
			{/* <h3>Settings Form</h3> */}
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
				<OptionsSchema>
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
									inputs={!singular ? null : singular}
								/>
								<LanguageInputContainer
									fieldSetClass='flex flex-col'
									label={'Plural'}
									languages={languages}
									name={'main-plural'}
									defaultLanguage={defaultLanguage}
									inputs={!plural ? null : plural}
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
