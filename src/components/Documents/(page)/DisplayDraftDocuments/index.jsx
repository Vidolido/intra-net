'use client';
import { useState } from 'react';

// components
import DraftDocument from './DraftDocument';
import ShowHideButton from '@/components/reusable/ShowHideButton';

const DisplayDraftDocuments = ({ documents }) => {
	const [visible, setVisible] = useState(false);

	// const handleVisible = () => {}

	return (
		<div className='flex flex-col gap-1 relative w-[30%]'>
			<ShowHideButton
				heading='Draft Documents'
				visible={visible}
				onClick={() => setVisible(!visible)}
			/>

			{!visible ? (
				''
			) : (
				<ul>
					{documents?.map((doc) => {
						return (
							<li
								key={doc._id}
								className=' border border-t-1 border-b-transparent last-of-type:border-b-slate-200 hover:border-b-red-300 '>
								<DraftDocument key={doc._id} document={doc} />
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default DisplayDraftDocuments;
