// components
import InputType from '@/components/inputs/InputType';
import SelectInput from '@/components/inputs/SelectInput';

const SingleInputField = ({
	field,
	documentHeader,
	laboratoryNumber,
	productAliases,
	basicInfo,
	onChange,
}) => {
	let fieldData = !basicInfo
		? null
		: basicInfo?.fields.find((f) => f._id === field._id)?.data || '';

	let documentLaboratoryNumber = basicInfo?.fields.find(
		(f) => f._id === field._id
	);

	fieldData =
		field.name.en === 'Laboratory Number' && !documentLaboratoryNumber?.data
			? laboratoryNumber
			: documentLaboratoryNumber?.data;

	if (field.inputType === 'select' && field.name.en === 'Sample') {
		let alias = productAliases.find(
			(alias) => alias._id === documentHeader.product
		);

		return (
			<label>
				<span className='block'>{field.name['en']}</span>
				<SelectInput
					id={field._id}
					name={field._id}
					property='value'
					options={alias.aliases}
					defaultValue={!fieldData ? alias.aliases[0]._id : fieldData}
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
					defaultValue={!fieldData ? field?.value : fieldData}
					onChange={onChange}
				/>
			</label>
		);
	}
};

export default SingleInputField;
