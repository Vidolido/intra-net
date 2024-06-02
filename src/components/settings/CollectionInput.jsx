import InputType from '../inputs/InputType';
import LanguageInputContainer from '../inputs/LanguageInputContainer';

const CollectionInput = ({ languages, inputType }) => {
	// console.log(languages[0]._id, inputType, 'OVIJA');
	return (
		<fieldset name='collection-input-fields' className='flex items-start gap-2'>
			{inputType === 'simple' ? (
				<InputType type='text' name='collection-input' />
			) : (
				''
			)}
			{inputType === 'translations' ? (
				<LanguageInputContainer
					languages={languages}
					defaultLanguage={languages[0]}
					fieldSetName='collection-language-inputs'
				/>
			) : (
				''
			)}
			{inputType === 'key/value' ? (
				<>
					<InputType type='text' name='key' />
					<InputType type='text' name='value' />
				</>
			) : (
				''
			)}
		</fieldset>
	);
};

export default CollectionInput;
