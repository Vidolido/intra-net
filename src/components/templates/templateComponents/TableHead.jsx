import { getDisplayHeadings } from '@/utils/getDisplayHeadings';
import React from 'react';

const TableHead = ({ template, settings, defaultLanguage }) => {
	// console.log(template[0], 'the template in TableHead');
	// console.log(settings, 'the settings in TableHead');
	let headings =
		(settings && getDisplayHeadings(settings[0], 'plural')) || null;
	// console.log(headings);
	return (
		<thead>
			<tr>
				<th className='w-[20px]'>{''}</th>
				{headings && headings.main && (
					<th className='text-left'>
						{headings?.main[defaultLanguage.language]}
					</th>
				)}
				{headings &&
					headings?.collections &&
					headings?.collections?.map((collection, index) => (
						<th key={index} className='text-left'>
							{collection[defaultLanguage.language]}
						</th>
					))}
				<th className='text-left'>Default Value</th>
				<th className='text-left'>Margin of Error</th>
				<th className='text-left'>options</th>
			</tr>
		</thead>
	);
};

export default TableHead;
