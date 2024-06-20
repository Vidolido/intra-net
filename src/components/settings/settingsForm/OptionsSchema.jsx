'use client';
import ArrowSvg from '@/../public/arrow.svg';
import { ADD } from '@/state/actionTypes';
import {
	useSettingsContext,
	useSettingsDispatchContext,
} from '@/state/settingsContext';

import { useCallback, useState } from 'react';

const OptionsSchema = ({ children, setting }) => {
	// const [show, setShow] = useState(true);
	const dispatch = useSettingsDispatchContext();
	const { showOptionsSchema } = useSettingsContext();

	return (
		<div
			className={`flex flex-col gap-1 bg-slate-100 border-[1px] border-slate-100 p-[1px] rounded`}>
			<button
				type='button'
				onClick={() =>
					dispatch({
						type: ADD,
						payload: {
							type: 'add',
							state: 'showOptionsSchema',
							value: !showOptionsSchema,
						},
					})
				}
				className='text-left relative'>
				<h4>Option schema</h4>
				<ArrowSvg
					className={`w-[22px] h-[22px] absolute right-1 top-[2px] fill-red-500 hover:fill-red-300 ${
						!showOptionsSchema ? '' : 'rotate-180'
					}`}
				/>
			</button>

			{!showOptionsSchema ? '' : children}
		</div>
	);
};

export default OptionsSchema;
