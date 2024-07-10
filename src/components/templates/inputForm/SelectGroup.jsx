// state/actions
import { generateUUID } from '@/utils/generateUUID';
import { nameArray } from '@/utils/nameArray';

// components
import ContextButton from '@/components/buttons/ContextButton';
import SelectInput from '@/components/inputs/SelectInput';

const SelectGroup = ({ showOptions, setShowOptions, groups, setGroup }) => {
	const handleSelect = (e) => {
		let selectedGroup = groups.settings.find(
			(group) => group._id === e.target.value
		);
		setGroup(selectedGroup);
	};
	const handleEnd = () => {
		setGroup({});
		setShowOptions(false);
	};

	let names = groups?.settings.map((setting) => ({
		id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));
	return (
		<label className='flex flex-col gap-2'>
			<SelectInput
				options={names}
				defaultLanguage='en'
				onChange={handleSelect}
				classes='w-10/12'
			/>
			<ContextButton label='End group' type='edit' onClick={handleEnd} />
		</label>
	);
};

export default SelectGroup;
