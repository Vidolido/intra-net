// components
import InputType from '@/components/inputs/InputType';
import SelectInput from '@/components/reusable/SelectInput';
// import SelectInput from '@/components/inputs/SelectInput';

const SingleInputField = ({
	languages,

	order,
	fields,
	field,
	documentHeader,
	laboratoryNumber,
	productAliases,
	basicInfo,
	onChange,
}) => {
	let defaultValue = null;
	// console.log(field, 'the field');
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
			(alias) => alias.product._id.toString() === documentHeader.product
		);
		// console.log(productAliases);
		// console.log(alias);

		return (
			<label>
				<span className='block'>{field?.name['en']}</span>
				<SelectInput
					defaultLanguage={languages[0].language}
					data={{
						state: alias.aliases,
						selectName: 'product',
						defaultValue: !defaultValue ? alias.aliases[0]._id : defaultValue,
						classes: 'flex flex-col items-start bg-white px-[2px] w-full',
					}}
				/>
				{/* <SelectInput
					id={field._id}
					name={field._id}
					property='value'
					options={alias.aliases}
					defaultValue={!fieldData ? alias.aliases[0]._id : fieldData}
					defaultLanguage='en'
				/> */}
				{/* <SelectInput
					id={field._id}
					options={order}
					defaultValue={field?.order}
				/> */}
				{/* <select
					className={`box-content border-2 border-grey-50 border-opacity-60 rounded hover:border-red-200 focus:outline-none cursor-pointer`}
					defaultValue={field.order}>
					{order?.map((order, index) => {
						return (
							<option key={index} value={order}>
								{order}
							</option>
						);
					})}
				</select> */}
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

				{/* <select
					id={null}
					className={`box-content border-2 border-grey-50 border-opacity-60 rounded hover:border-red-200 focus:outline-none cursor-pointer`}
					defaultValue={field.order}>
					{order?.map((order, index) => {
						return (
							<option key={index} value={order}>
								{order}
							</option>
						);
					})}
				</select> */}
				{/* <SelectInput
					id={field._id}
					options={order}
					defaultValue={field?.order}
				/> */}
			</label>
		);
	}
};

export default SingleInputField;
