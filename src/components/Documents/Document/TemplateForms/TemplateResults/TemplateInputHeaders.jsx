import { getDisplayHeadings } from '@/utils/getDisplayHeadings';
import { getRowHeaders } from '@/utils/helpers/rowHeaders';

const TemplateInputHeaders = ({ template, defaultLanguage }) => {
	let headings = getRowHeaders(template.schemaNames, 'plural');
	return (
		<thead>
			<tr>
				{headings && headings?.parameter && (
					<th className='text-left text-sm'>
						{headings?.parameter[defaultLanguage.language]}
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
