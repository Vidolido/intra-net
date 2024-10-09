'use client';
import { Fragment } from 'react';

// state/actions
import {
	useSingleDocumentContext,
	useSingleDocumentDispatchContext,
} from '@/state/laboratory/documents/singleDocument/singleDocumentContext';
import { generateUUID } from '@/utils/generateUUID';
// import { getDisplayHeadings } from '@/utils/getDisplayHeadings';
import { groupParameters } from '@/utils/templates/groupParameters';

// components
import TemplateRow from './TemplateRow';
import { generateGridTemplate } from '@/utils/functions';

const getDisplayHeadings = (setting) => ({
	main: setting?.parameter?.name.plural,
	collections: setting?.collections?.map((setting) => ({
		_id: setting._id,
		name: setting.name,
	})),
});

const ViewTemplate = ({
	template,
	templateId,
	laboratorySettings,
	defaultLanguage,
}) => {
	const { template: stateTemplate, checkedRows } = useSingleDocumentContext();
	const dispatch = useSingleDocumentDispatchContext();

	// let collectionCount = 5;
	// let collectionCount = Object.keys(item.items).length - checkedRows.length;
	// console.log(template, 'the template');
	let collectionCount =
		Object.keys(template[0].items).length +
		2 -
		stateTemplate.hideColumns.length;
	let gridTemplateColumns = generateGridTemplate(collectionCount);

	let headings =
		(laboratorySettings &&
			getDisplayHeadings(laboratorySettings[0], 'plural')) ||
		null;

	let mutTemplate = groupParameters(template) || [];

	// console.log(mutTemplate, 'mutTemplate');

	// console.log(template[0], 'the template');
	// console.log(checkedRows, 'the checkedRows');
	return (
		<div className='border'>
			<div
				className={`grid place-content-center border border-slate-500`}
				style={{ gridTemplateColumns }}>
				<div className='border-r border-slate-500 py-6'></div>
				{headings && headings.main && (
					<h6 className='border-r border-slate-500 flex justify-center items-center'>
						<span>{headings?.main[defaultLanguage.language]}</span>
					</h6>
				)}
				{headings &&
					headings?.collections &&
					headings?.collections?.map((collection, index) => {
						if (stateTemplate.hideColumns.includes(collection._id.toString()))
							return;

						return (
							<h6
								key={index}
								className='text-left border-double border-r border-slate-500 flex justify-center items-center'>
								<span>{collection.name[defaultLanguage.language]}</span>
							</h6>
						);
					})}
				<h6 className='text-left border-r border-slate-500 flex justify-center items-center'>
					Result
				</h6>
				<p></p>
			</div>
			{mutTemplate.map((item, i) => {
				{
					/* console.log(item, 'the item'); */
				}
				if (item.isGroup == undefined && item.parameter) {
					return (
						<TemplateRow
							key={item._id || i}
							item={item}
							templateId={templateId}
							gridTemplateColumns={gridTemplateColumns}
						/>
					);
				}
				if (item.isGroup) {
					return item.items.map((collectionItem, i) => {
						return (
							<Fragment key={generateUUID()}>
								{i === 0 ? (
									<div className='w-full border border-t-0 border-slate-500 pl-2 pb-[1px]'>
										{item.name['en']}
									</div>
								) : null}
								<TemplateRow
									key={i}
									item={collectionItem}
									templateId={templateId}
									gridTemplateColumns={gridTemplateColumns}
								/>
							</Fragment>
						);
					});
				}
			})}
		</div>
	);
};

export default ViewTemplate;
