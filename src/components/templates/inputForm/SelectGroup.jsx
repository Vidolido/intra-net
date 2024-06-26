// state/actions
import { generateUUID } from '@/utils/generateUUID';

// components
import ContextButton from '@/components/buttons/ContextButton';
import SelectInput from '@/components/inputs/SelectInput';

const SelectGroup = ({ showOptions, setShowOptions, groups, setGroup }) => {
	const handleSelect = (e) => {
		console.log(e.target.value);
		let selectedGroup = groups.find((group) => group.id === e.target.value);
		setGroup(selectedGroup);
	};
	// console.log(groups, 'the groups');
	const handleEnd = () => {
		setGroup({});
		setShowOptions(false);
	};
	return (
		<label>
			<SelectInput
				options={groups}
				defaultLanguage='en'
				onChange={handleSelect}
			/>
			<ContextButton
				label='cancel'
				type='default'
				onClick={() => setShowOptions(false)}
			/>
			<ContextButton label='End group' type='edit' onClick={handleEnd} />
		</label>
	);
};

export default SelectGroup;
