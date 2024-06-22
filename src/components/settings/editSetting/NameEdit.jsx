'use client';

// state/actions
import { createLanguageInputs } from '@/utils/createLanguageInputs';

// components
import LanguageInputContainer from '@/components/inputs/LanguageInputContainer';

const NameEdit = ({ languages, defaultLanguage, value }) => {
	let inputs = createLanguageInputs(value);

	return (
		<LanguageInputContainer
			label='name'
			inputs={inputs}
			languages={languages}
			defaultLanguage={defaultLanguage}
		/>
	);
};

export default NameEdit;
