'use client';
import { useState } from 'react';

// state/actions
import { nameArray } from '@/utils/nameArray';

// components
import CloseSvg from '@/../public/close.svg';

import ContextButton from '@/components/buttons/ContextButton';
import SelectGroup from './SelectGroup';
import { mutateForSelect } from '@/utils/templates/mutateForSelect';

const GroupParam = ({ languages, setGroup, groups }) => {
	let mutGroups = mutateForSelect(groups.settings);
	const [showOptions, setShowOptions] = useState(false);

	const handleGroup = () => {
		setShowOptions(!showOptions);
		setGroup(mutGroups[0]);
	};

	const handleClose = (e) => {
		setShowOptions(false);
		setGroup({});
	};

	// console.log(groups, 'groups');

	return (
		<fieldset
			name='group-parameter'
			className='flex gap-2 w-full relative border border-slate-300 rounded p-1'>
			{!showOptions && (
				<ContextButton
					label='Group items'
					type='edit'
					onClick={handleGroup}
					classes='w-full'
				/>
			)}
			{showOptions && (
				<SelectGroup
					languages={languages}
					setShowOptions={setShowOptions}
					groups={mutGroups}
					setGroup={setGroup}
				/>
			)}
			{showOptions && (
				<CloseSvg
					onClick={handleClose}
					className={`w-[22px] h-[22px] absolute right-[2px] top-1 text-red-500 hover:text-red-300 cursor-pointer`}
				/>
			)}
		</fieldset>
	);
};

export default GroupParam;
