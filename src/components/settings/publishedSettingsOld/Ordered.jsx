'use client';
import { useState } from 'react';

// components
import ArrowSvg from '@/../public/arrow.svg';
import PublishedSetting from './PublishedSetting';

const Ordered = ({ setting }) => {
	const [visible, setVisible] = useState(false);

	return (
		<div className='border relative min-w-72'>
			<h4
				className='border-b relative z-10 cursor-pointer'
				onClick={() => setVisible(!visible)}>
				{setting.sector}
			</h4>
			<ArrowSvg
				className={`w-[22px] h-[22px] absolute right-1 top-[3px] fill-red-500 hover:fill-red-300 ${
					visible ? '' : 'rotate-180'
				} z-0`}
			/>
			{!visible ? (
				''
			) : (
				<ul className='p-2'>
					{setting?.items?.map((item) => {
						return (
							<li
								key={item._id}
								className='flex justify-between gap-2 w-full mb-1'>
								<PublishedSetting setting={item} />
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default Ordered;
