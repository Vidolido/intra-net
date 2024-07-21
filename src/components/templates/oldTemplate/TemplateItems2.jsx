// state/actions
import { generateUUID } from '@/utils/generateUUID';
import { getDisplayHeadings } from '@/utils/getDisplayHeadings';
import { groupParameters } from '@/utils/templates/groupParameters';
import TemplateRow from '../templateComponents/TemplateRow';
import { Fragment } from 'react';

const TemplateItems2 = ({ template, settings, defaultLanguage }) => {
	let headings =
		(settings && getDisplayHeadings(settings[0], 'plural')) || null;

	let mutTemplate = groupParameters(template.template) || [];

	return (
		<div className='border w-3/4'>
			<div className='grid grid-cols-[25px_25%_1fr_1fr_1fr_1fr_1fr_25px]'>
				<div></div>
				{headings && headings.main && (
					<h6 className='text-left'>
						{headings?.main[defaultLanguage.language]}
					</h6>
				)}
				{headings &&
					headings?.collections &&
					headings?.collections?.map((collection, index) => (
						<h6 key={index} className='text-left'>
							{collection[defaultLanguage.language]}
						</h6>
					))}
				<h6>Default Value</h6>
				<h6>Margin of Error</h6>
				<p></p>
			</div>
			<div>
				{mutTemplate.map((item) => {
					if (item.isGroup == undefined && item.parameter) {
						return (
							<TemplateRow
								key={item._id}
								item={item}
								templateId={template._id}
							/>
						);
					}
					if (item.isGroup) {
						return item.items.map((collectionItem, i) => {
							return (
								<Fragment key={generateUUID()}>
									{i === 0 ? (
										<div className='grid grid-cols-8'>{item.name['en']}</div>
									) : null}
									<TemplateRow
										item={collectionItem}
										templateId={template._id}
									/>
								</Fragment>
							);
						});
					}
				})}
			</div>
		</div>
	);
};

export default TemplateItems2;
