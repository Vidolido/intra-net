import { getDisplayHeadings } from '@/utils/getDisplayHeadings';

const TemplateInputHeaders = ({ template, settings, defaultLanguage }) => {
	let headings =
		(settings && getDisplayHeadings(settings[0], 'plural')) || null;
	return (
		<thead>
			<tr>
				{headings && headings.main && (
					<th className='text-left text-sm'>
						{headings?.main[defaultLanguage.language]}
					</th>
				)}
				{headings &&
					headings?.collections &&
					headings?.collections?.map((collection, index) => (
						<th key={index} className='text-left text-sm'>
							{collection[defaultLanguage.language]}
						</th>
					))}
				<th className='text-left text-sm'>Result</th>
				{/* <th className='text-left'>Margin of Error</th>
				<th className='text-left'>options</th> */}
			</tr>
		</thead>
	);
};

export default TemplateInputHeaders;
