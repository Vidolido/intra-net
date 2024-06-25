import { useState } from 'react';

// components
import ContextButton from '@/components/buttons/ContextButton';
import SelectInput from '@/components/inputs/SelectInput';
import SelectGroup from './SelectGroup';

const GroupParam = ({ selected }) => {
	// console.log(selected, 'selected');
	const [showOptions, setShowOptions] = useState(false);
	const handleGroup = () => {
		setShowOptions(!showOptions);
	};
	return (
		<fieldset name='group-parameter'>
			{!showOptions ? (
				<ContextButton label='Group items' type='edit' onClick={handleGroup} />
			) : (
				''
			)}
			{showOptions ? (
				<SelectGroup
					showOptions={showOptions}
					setShowOptions={setShowOptions}
				/>
			) : (
				''
			)}
		</fieldset>
	);
};

export default GroupParam;
