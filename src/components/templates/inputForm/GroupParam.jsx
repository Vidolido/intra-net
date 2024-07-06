'use client';
import { useState } from 'react';

// state/actions
import { nameArray } from '@/utils/nameArray';

// components
import CloseSvg from '@/../public/close.svg';

import ContextButton from '@/components/buttons/ContextButton';
import SelectGroup from './SelectGroup';

const GroupParam = ({ setGroup, groups }) => {
	const [showOptions, setShowOptions] = useState(false);
	// let names = groups?.settings.map((setting) => ({
	// 	id: setting._id,
	// 	...nameArray(setting.parameter.inputValue),
	// }));
	const handleGroup = () => {
		// console.log(groups.settings[0], 'THE FUCKING GROUP');
		setShowOptions(!showOptions);
		setGroup(groups?.settings[0]);
	};

	const handleClose = (e) => {
		setShowOptions(false);
		setGroup({});
	};

	// console.log(groups, 'the groups');
	return (
		<fieldset
			name='group-parameter'
			className='flex gap-2 justify-self-end relative border border-slate-300 rounded p-1'>
			{!showOptions ? (
				<ContextButton label='Group items' type='edit' onClick={handleGroup} />
			) : (
				''
			)}
			{showOptions ? (
				<SelectGroup
					showOptions={showOptions}
					setShowOptions={setShowOptions}
					groups={groups}
					setGroup={setGroup}
				/>
			) : (
				''
			)}
			{showOptions ? (
				<CloseSvg
					onClick={handleClose}
					className={`w-[22px] h-[22px] absolute right-[2px] top-1 text-red-500 hover:text-red-300 cursor-pointer`}
				/>
			) : (
				''
			)}
		</fieldset>
	);
};

export default GroupParam;
