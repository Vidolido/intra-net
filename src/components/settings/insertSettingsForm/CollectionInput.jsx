// components
import InputType from '@/components/inputs/InputType';
import LanguageInputContainer from '@/components/inputs/LanguageInputContainer';

const CollectionInput = ({ languages, inputType, name, values, onChange }) => {
	let isLanguageInput = values && values[languages[0].language] !== undefined;
	let mutValues = [];

	if (isLanguageInput) {
		mutValues = Object.keys(values).map((key) => {
			return { [key]: values[key] };
		});
	}

	// console.log(mutValues, 'mutValues');
	return (
		<fieldset name={name} className='flex items-start gap-2'>
			{inputType === 'simple' ? (
				<InputType
					type='text'
					name='collection-input'
					value={values}
					onChange={onChange}
				/>
			) : (
				''
			)}
			{inputType === 'translations' ? (
				<LanguageInputContainer
					languages={languages}
					defaultLanguage={languages[0]}
					fieldSetName='collection-language-inputs'
					inputs={isLanguageInput ? mutValues : values}
					onChange={onChange}
				/>
			) : (
				''
			)}
			{inputType === 'key/value' ? (
				<>
					<InputType
						type='text'
						name='key'
						value={values?.key}
						onChange={onChange}
					/>
					<InputType
						type='text'
						name='value'
						value={values?.value}
						onChange={onChange}
					/>
				</>
			) : (
				''
			)}
		</fieldset>
	);
};

export default CollectionInput;
