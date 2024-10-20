import { Fragment } from 'react';

// state/actions
import { generateUUID } from '@/utils/generateUUID';
// import { getDisplayHeadings } from '@/utils/getDisplayHeadings';
import { getRowHeaders } from '@/utils/helpers/rowHeaders';
import { groupParameters } from '@/utils/templates/groupParameters';

// components
import TemplateRow from './TemplateRow';

const TemplateItems = ({ template, setting, defaultLanguage }) => {
	const { optionsSchema, settings } = setting;

	let headings = getRowHeaders(optionsSchema, 'plural') || null;

	let mutTemplate = groupParameters(template.template) || [];
	console.log(mutTemplate, 'mutTemplate');
	// console.log(defaultLanguage, 'MUT defaultLanguage');
	return (
		<div className='border w-3/4'>
			<div className='grid grid-cols-[25px_25%_1fr_1fr_1fr_1fr_1fr_25px] border border-slate-400 bg-slate-100'>
				<div className='border-r border-slate-400'></div>
				{headings && headings?.parameter && (
					<h6 className='text-left border-r border-slate-400 pl-2'>
						{headings?.parameter[defaultLanguage.language]}
					</h6>
				)}
				{headings &&
					headings?.collections &&
					headings?.collections?.map((collection, index) => (
						<h6
							key={index}
							className='text-left border-double border-r border-slate-400 pl-2'>
							{collection[defaultLanguage.language]}
						</h6>
					))}
				<h6 className='text-left border-r border-slate-400 pl-2'>
					Default Value
				</h6>
				<h6 className='pl-2'>Margin of Error</h6>
				<p></p>
			</div>
			{mutTemplate.map((item) => {
				if (item.isGroup == undefined && item.parameter) {
					return (
						<TemplateRow key={item._id} item={item} templateId={template._id} />
					);
				}
				if (item.isGroup) {
					return item.items.map((collectionItem, i) => {
						let length = i === item.items.length - 1;
						console.log(length, 'THE LENGTH');
						return (
							<Fragment key={generateUUID()}>
								{i === 0 ? (
									<div className='w-full border-b border-b-slate-300 border border-slate-400 pl-[32px] pb-[1px]'>
										{item.name['en']}
									</div>
								) : null}
								<TemplateRow
									item={collectionItem}
									templateId={template._id}
									classes={`border border-slate-300 border-l-slate-400 border-r-slate-400 ${
										length ? 'border-slate-400 border-t-0' : ''
									}`}
								/>
							</Fragment>
						);
					});
				}
			})}
		</div>
	);
};

export default TemplateItems;
