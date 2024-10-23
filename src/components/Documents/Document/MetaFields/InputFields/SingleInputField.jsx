// components
import InputType from '@/components/inputs/InputType';
import NormalInput from '@/components/reusable/NormalInput';
import SelectInput from '@/components/reusable/SelectInput';
// import SelectInput from '@/components/inputs/SelectInput';

const SingleInputField = ({
	languages,
	field,
	documentInfo,
	handleDocumentMeta,
}) => {
	let { meta } = documentInfo;

	const handleValue = (data, dataObj) => {
		const { id, type } = dataObj;
		let newDocumentMeta = [...meta];
		if (type === 'date') {
			const date = new Date(data);
			newDocumentMeta.find((field) => field._id === id).value = date;
			return;
		}
		newDocumentMeta.find((field) => field._id === id).value = data;
		handleDocumentMeta(newDocumentMeta);
	};
	return (
		<label>
			<span className='block'>{field.name['en']}</span>
			<NormalInput
				data={{
					_id: field?._id,
					state: field?.value || '',
					type: field?.inputType,
					name: field?.name?.en,
					fieldsetClass: 'flex flex-col grow bg-white px-[2px]',
					inputClass: 'h-21px',
				}}
				extractData={handleValue}
				// reset={reset}
			/>
		</label>
	);
};

export default SingleInputField;
