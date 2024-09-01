import FormInput from './FormInput';
import Headers from './Headers';

const InputForm = ({ document, settings, groups, defaultLanguage }) => {
	return (
		<div id='addTemplateSchema' className='bg-slate-200 rounded w-[95%]'>
			<Headers settings={settings} defaultLanguage={defaultLanguage} />

			<FormInput
				document={document}
				settings={settings}
				groups={groups}
				defaultLanguage={defaultLanguage}
			/>
		</div>
	);
};

export default InputForm;
