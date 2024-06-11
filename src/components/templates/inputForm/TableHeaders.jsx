import { getDisplayHeadings } from '@/utils/getDisplayHeadings';

const TableHeaders = ({ settings, defaultLanguage }) => {
	let headings =
		(settings && getDisplayHeadings(settings[0], 'plural')) || null;
	return (
		<div id='headings' className='grid grid-cols-7 gap-4'>
			{headings && headings.main && (
				<h6>{headings?.main[defaultLanguage.language]}</h6>
			)}
			{headings &&
				headings?.collections &&
				headings?.collections?.map((collection, index) => (
					<h6 key={index}>{collection[defaultLanguage.language]}</h6>
				))}
			<h6>Default Value</h6>
			<h6>Margin of Error</h6>
		</div>
	);
};

export default TableHeaders;
