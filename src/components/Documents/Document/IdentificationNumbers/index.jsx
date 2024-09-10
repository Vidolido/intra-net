'use client';
import { useState } from 'react';

// state/actions
import { saveIdentificationNumbers } from '@/serverActions/laboratoryAnalyses/saveIdentificationNumbers';
import { nameArray } from '@/utils/nameArray';

// components
import InputType from '@/components/inputs/InputType';
import SelectInput from '@/components/inputs/SelectInput';

const IdentificationNumbers = ({
	languages,
	document,
	identificationNumbers,
}) => {
	const [state, setState] = useState(
		!document.identificationNumbers.length
			? identificationNumbers.map((item) => ({
					_id: item._id,
					name: item.name,
					value: '',
			  }))
			: document.identificationNumbers
	);
	const [selected, setSelected] = useState(identificationNumbers[0]._id);

	const handleChange = (e) => {
		const newState = [...state];
		let selection = newState.find((item) => item._id.toString() === selected);
		selection.value = e.target.value;
		setState(newState);
	};

	const handleBlur = async () => {
		await saveIdentificationNumbers(state, document._id);
	};

	const handleOnChange = (e) => {
		setSelected(e.target.value);
	};
	// console.log(state, 'THE  STATE');
	return (
		<form className='pb-1'>
			<h6>Identification Numbers</h6>
			<div className='flex w-fit gap-2'>
				<InputType
					onBlur={handleBlur}
					onChange={handleChange}
					classes={'w-28'}
					value={
						state?.find((item) => item._id.toString() === selected).value || ''
					}
				/>
				<SelectInput
					options={state}
					property={'name'}
					defaultLanguage={'en'}
					onChange={handleOnChange}
				/>
			</div>
		</form>
	);
};

export default IdentificationNumbers;
