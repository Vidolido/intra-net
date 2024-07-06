// state/actions
import { generateUUID } from '@/utils/generateUUID';

// components
import ContextButton from '@/components/buttons/ContextButton';
import SelectInput from '@/components/inputs/SelectInput';
import { nameArray } from '@/utils/nameArray';

const SelectGroup = ({ showOptions, setShowOptions, groups, setGroup }) => {
	const handleSelect = (e) => {
		// console.log(e.target.value, 'ova');
		// console.log(groups, 'the groups at the  end');
		let selectedGroup = groups.settings.find(
			(group) => group._id === e.target.value
		);
		// console.log(selectedGroup, 'ova selecterdx');
		setGroup(selectedGroup);
	};
	// console.log(groups, 'the groups in Select Group');
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
			{/* <ContextButton
        label='cancel'
        type='default'
        onClick={() => setShowOptions(false)}
      /> */}
			<ContextButton label='End group' type='edit' onClick={handleEnd} />
		</label>
	);
};

export default SelectGroup;
