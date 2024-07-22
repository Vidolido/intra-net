'use client';
import { useState } from 'react';

// state/actions
import { saveOptionSchema } from '@/serverActions/settings/saveOptionSchema';

// components
import ArrowSvg from '@/../public/arrow.svg';
import LanguageInputContainer from '@/components/inputs/LanguageInputContainer';
import AddCollections from '../settingsForm/AddCollections';
import FormCollections from '../settingsForm/FormCollections';
import ContextButton from '@/components/buttons/ContextButton';

const OptionsSchema = ({ setting, languages }) => {
	console.log(setting, 'setting in optionsSchema');
	const { optionsSchema } = setting;
	const defaultLanguage = languages.find((lang) => lang.language === 'en');

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

	// const [visible, setVisible] = useState(false);
	const [visible, setVisible] = useState(
		setting.optionsSchema && setting.settings ? false : true
	);

	let docId = setting._id;
	const submit = saveOptionSchema.bind(null, docId);

	return (
		<form
			action={submit}
			className='flex flex-col gap-1 bg-slate-100 border-[1px] border-slate-100 p-1 rounded'>
			<button
				type='button'
				onClick={() => setVisible(!visible)}
				className='relative w-full'>
				<h4 className='text-left'>Option schema</h4>
				<ArrowSvg
					className={`w-[22px] h-[22px] absolute right-1 top-[3px] fill-red-500 hover:fill-red-300 ${
						visible ? '' : 'rotate-180'
					}`}
				/>
			</button>
			{!visible ? (
				''
			) : (
				<>
					<fieldset
						name='option-schema-main'
						className='border border-slate-300 rounded p-1'>
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
				</>
			)}
			{!visible ? (
				''
			) : (
				<ContextButton
					label='Use Schema'
					type='edit'
					onClick={(e) => e.target.form.requestSubmit()}
				/>
			)}
		</form>
	);
};

export default OptionsSchema;
