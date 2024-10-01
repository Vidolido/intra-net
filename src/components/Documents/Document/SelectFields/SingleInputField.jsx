// components
import InputType from '@/components/inputs/InputType';
import SelectInput from '@/components/inputs/SelectInput';

const SingleInputField = ({
	field,
	documentHeader,
	productAliases,
	onChange,
}) => {
	if (field.inputType === 'select' && field.name.en === 'Sample') {
		let alias = productAliases.find(
			(alias) => alias._id === documentHeader.product
		);
		console.log(alias, 'THE ALIAS');
		return (
			<label>
				<span className='block'>{field.name['en']}</span>
				<SelectInput
					id={field._id}
					name={field._id}
					property='value'
					options={alias.aliases}
					defaultValue={alias.aliases[0]._id}
					defaultLanguage='en'
				/>
			</label>
		);
	} else {
		return (
			<label>
				<span className='block'>{field.name['en']}</span>
				<InputType
					id={field._id}
					name={field._id}
					type={field?.inputType}
					classes={'min-w-fit'}
					defaultValue={field?.value}
					onChange={onChange}
				/>
			</label>
		);
	}
};

export default SingleInputField;
