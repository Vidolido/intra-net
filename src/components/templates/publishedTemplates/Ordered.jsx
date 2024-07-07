'use client';
import { useState } from 'react';

// components
import ArrowSvg from '@/../public/arrow.svg';
import PublishedTemplate from './PublishedTemplate';
// import PublishedSetting from './PublishedSetting';

const Ordered = ({ product, products, templateSettings }) => {
	const [visible, setVisible] = useState(false);

	return (
		<div className='border relative min-w-72'>
			<h4
				className='border-b relative z-10 cursor-pointer'
				onClick={() => setVisible(!visible)}>
				{product.name['en']}
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
					<li className='grid grid-cols-3 w-full'>
						<p>Type</p>
						<p>Country</p>
						<p>{` `}</p>
					</li>
					{product?.items?.map((template) => {
						return (
							<li key={template._id} className='grid grid-cols-3 w-full mb-1'>
								<PublishedTemplate
									template={template}
									products={products}
									templateSettings={templateSettings}
								/>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default Ordered;
