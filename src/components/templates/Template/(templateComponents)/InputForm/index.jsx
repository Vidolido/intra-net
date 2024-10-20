import Form from './Form';
import Headers from './Headers';

const InputForm = ({
	languages,
	document,
	setting,
	groups,
	defaultLanguage,
}) => {
	return (
		<div id='addTemplateSchema' className='bg-slate-200 rounded w-[95%]'>
			<Headers setting={setting} defaultLanguage={defaultLanguage} />

			<Form
				languages={languages}
				document={document}
				setting={setting}
				groups={groups}
				defaultLanguage={defaultLanguage}
			/>
		</div>
	);
};

export default InputForm;
