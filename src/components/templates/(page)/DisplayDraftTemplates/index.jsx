'use client';
import { useState } from 'react';

// components
import ArrowSvg from '@/../public/arrow.svg';
import Template from './Template';

const DisplayDraftTemplates = ({ drafts }) => {
	const [visible, setVisible] = useState(false);

	return (
		<div className='flex flex-col gap-1 relative w-[30%]'>
			<h4
				className='border-b relative z-10 cursor-pointer'
				onClick={() => setVisible(!visible)}>
				Draft Templates
			</h4>
			<ArrowSvg
				className={`w-[22px] h-[22px] absolute right-1 top-[3px] fill-red-500 hover:fill-red-300 ${
					visible ? '' : 'rotate-180'
				} z-0`}
			/>
			{!visible ? (
				''
			) : (
				<ul>
					{drafts?.map((template) => {
						return (
							<li
								key={template._id}
								className=' border border-t-1 border-b-transparent last-of-type:border-b-slate-200 hover:border-b-red-300 '>
								<Template key={template._id} draft={template} />
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default DisplayDraftTemplates;
