// components
import InputType from '@/components/inputs/InputType';
import NormalInput from '@/components/reusable/NormalInput';
import SelectInput from '@/components/reusable/SelectInput';

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
			const date = new Date(data); // `data` is the date from the input field
			const currentTime = new Date(); // Get current time

			// Set the current time (hours, minutes, seconds) on the parsed date
			date.setHours(currentTime.getHours());
			date.setMinutes(currentTime.getMinutes());
			date.setSeconds(currentTime.getSeconds());
			date.setMilliseconds(currentTime.getMilliseconds());
			// console.log(date, 'date beforesave');
			// const macedonianDateTime = date.toLocaleString('en-GB', {
			// 	timeZone: 'Europe/Skopje',
			// });
			newDocumentMeta.find((field) => field._id === id).value = date;
			// return;
		} else {
			newDocumentMeta.find((field) => field._id === id).value = data;
		}
		handleDocumentMeta(newDocumentMeta);
	};
	console.log(field, 'the field');
	let theDate =
		field?.inputType === 'date' && typeof field?.value === 'string'
			? field.value.split('T')[0] // Extract YYYY-MM-DD part
			: null;

	return (
		<label>
			<span className='block'>{field.name['en']}</span>
			<NormalInput
				data={{
					_id: field?._id,
					state: theDate || field?.value || '',
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
