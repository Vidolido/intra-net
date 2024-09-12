import LanguageInputContainer from '@/components/inputs/LanguageInputContainer';
import { createLanguageInputs } from '@/utils/createLanguageInputs';

const ParamValue = ({ languages, value }) => {
	let inputs = createLanguageInputs(value);
	return (
		<LanguageInputContainer
			label='Value'
			name='inputValue'
			languages={languages}
			defaultLanguage={languages[0]}
			inputs={inputs}
		/>
	);
};

export default ParamValue;
