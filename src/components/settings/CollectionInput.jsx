import InputType from '../inputs/InputType';
import LanguageInputContainer from '../inputs/LanguageInputContainer';

const CollectionInput = ({ languages, inputType }) => {
	console.log(languages[0]._id, inputType, 'OVIJA');
	return (
		<div>
			{inputType === 'simple' ? (
				<InputType type='text' name='collection-input' />
			) : (
				''
			)}
			{inputType === 'translations' ? (
				<LanguageInputContainer
					languages={languages}
					defaultLanguage={languages[0]}
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

			{/* <LanguageInputContainer label='EDEN LABEL' languages={languages} /> */}
		</div>
	);
};

export default CollectionInput;
