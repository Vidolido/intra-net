import { getRowHeaders } from '@/utils/helpers/rowHeaders';

const Headers = ({ setting, defaultLanguage }) => {
	let headings = getRowHeaders(setting.optionsSchema, 'plural') || null;

	return (
		<div id='headings' className='grid grid-cols-7 gap-4 p-2'>
			{headings && headings.parameter && (
				<h6>{headings?.parameter[defaultLanguage.language]}</h6>
			)}
			{headings &&
				headings?.collections &&
				headings?.collections?.map((collection, index) => (
					<h6 key={index} className='px-1'>
						{collection[defaultLanguage.language]}
					</h6>
				))}
			<h6>Default Value</h6>
			<h6>Margin of Error</h6>
		</div>
	);
};

export default Headers;
