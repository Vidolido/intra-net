import LanguageInputContainer from '@/components/inputs/LanguageInputContainer';

const MainInput = ({ languages }) => {
	return (
		<fieldset
			name='option-schema-main'
			className='border border-slate-300 rounded p-1'>
			<h5>Main parameter</h5>
			<div className='flex gap-2'>
				<LanguageInputContainer
					fieldSetName='singular'
					label='Singular'
					languages={languages}
					defaultLanguage={languages[0]}
				/>
				<LanguageInputContainer
					fieldSetName='plural'
					label='Plural'
					languages={languages}
					defaultLanguage={languages[0]}
				/>
			</div>
		</fieldset>
	);
};

export default MainInput;
