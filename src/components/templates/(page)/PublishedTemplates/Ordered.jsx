'use client';
import { useState } from 'react';

// components
import ArrowSvg from '@/../public/arrow.svg';
import Template from './Template';

const Ordered = ({ product, data }) => {
	const [visible, setVisible] = useState(false);

	return (
		<div className='border border-slate-300 relative px-1 rounded'>
			<h4
				className={`relative z-10 cursor-pointer hover:text-red-500 pl-1 ${
					!visible ? '' : 'text-red-600'
				}`}
				onClick={() => setVisible(!visible)}>
				{product.parameter['en']}
			</h4>
			<ArrowSvg
				className={`w-[22px] h-[22px] absolute right-1 top-[3px] fill-red-500 hover:fill-red-300 ${
					visible ? '' : 'rotate-180'
				} z-0`}
			/>
			{!visible ? (
				''
			) : (
				<ul className='pb-1'>
					<li className='grid grid-cols-[1fr_1fr_1fr_25px] col-end-auto text-black font-semibold bg-slate-200 '>
						<p className='pl-1 pb-1 min-w-36'>Type</p>
						<p className='border-l border-slate-400 pl-1 pb-1'>Country</p>
						<p className='border-l border-slate-400 pl-1 pb-1'>Sample</p>
						<p></p>
					</li>
					{product?.items?.map((template) => {
						return (
							<li
								key={template._id}
								className='grid grid-cols-[1fr_1fr_1fr_25px] border-b last-of-type:border-transparent hover:border-red-300'>
								<Template template={template} data={data} />
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default Ordered;
