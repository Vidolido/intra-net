// state/actions
import { generateUUID } from '@/utils/generateUUID';
import { nameArray } from '@/utils/nameArray';

// components
import ContextButton from '@/components/buttons/ContextButton';
import SelectInput from '@/components/reusable/SelectInput';
// import SelectInput from '@/components/inputs/SelectInput';

const SelectGroup = ({ languages, setShowOptions, groups, setGroup }) => {
	const handleSelect = (data) => {
		let selectedGroup = groups.find((group) => group._id === data);
		setGroup(selectedGroup);
	};
	const handleEnd = () => {
		setGroup({});
		setShowOptions(false);
	};
	return (
		<label className='flex flex-col gap-2'>
			<SelectInput
				defaultLanguage={languages[0].language}
				data={{
					state: groups,
					defaultValue: groups[0]._id,
					classes: 'flex flex-col items-start bg-white px-[2px] w-[93%]',
				}}
				extractData={handleSelect}
				// resetComponentData={resetComponentData}
				// setResetComponentData={setResetComponentData}
			/>
			<ContextButton label='End group' type='edit' onClick={handleEnd} />
		</label>
	);
};

export default SelectGroup;
