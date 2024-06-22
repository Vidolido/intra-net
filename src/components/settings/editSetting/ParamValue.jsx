import LanguageInputContainer from '@/components/inputs/LanguageInputContainer';
import { createLanguageInputs } from '@/utils/createLanguageInputs';

const ParamValue = ({ languages, value }) => {
	let inputs = createLanguageInputs(value);
	return (
		<label>
			<span>Value</span>
			<LanguageInputContainer
				name='inputValue'
				languages={languages}
				defaultLanguage={languages[0]}
				inputs={inputs}
			/>
		</label>
	);
};

export default ParamValue;
