'use client';
import {
	CHECK_ROW,
	UNCHECK_ROW,
} from '@/state/laboratory/documents/singleDocument/actionTypes';
// state/actions
import {
	useSingleDocumentContext,
	useSingleDocumentDispatchContext,
} from '@/state/laboratory/documents/singleDocument/singleDocumentContext';
import { formatKeyValue } from '@/utils/settings/formatKeyValue';

const TemplateRow = ({ item, templateId, gridTemplateColumns }) => {
	const { template, checkedRows } = useSingleDocumentContext();
	const dispatch = useSingleDocumentDispatchContext();

	const onChecked = (e) => {
		const { checked, value } = e.target;
		checked
			? dispatch({ type: CHECK_ROW, payload: value })
			: dispatch({ type: UNCHECK_ROW, payload: value });
	};

	// console.log(item, 'THE FUCKING ITEM');
	console.log(template.hideColumns);

	return (
		<div
			className='grid border border-t-0 border-slate-500'
			style={{ gridTemplateColumns }}>
			<div className='border-r border-slate-500 flex justify-center items-center w-full'>
				<input
					type='checkbox'
					checked={checkedRows.includes(item._id.toString()) ? 'checked' : ''}
					value={item._id}
					onChange={onChecked}
				/>
			</div>
			<p className='border-r border-slate-500 pl-2'>
				{item.parameter.propertyValue['en']}
			</p>
			{Object.entries(item.items).map((collection) => {
				console.log(collection, 'THE OTHER COLLECTION');
				if (template.hideColumns.includes(collection[0])) return;

				return (
					<div
						key={collection[0]}
						className='border-r border-slate-500 flex justify-center items-center w-full'>
						{collection[1] &&
							collection[1].map((collectionItem) => {
								if (template.hideColumns.includes(collectionItem[0])) return;
								return (
									<p key={collectionItem._id}>
										{(typeof collectionItem.value === 'string' &&
											collectionItem.value) ||
											collectionItem.value['en'] ||
											formatKeyValue(
												collectionItem?.value?.key,
												collectionItem?.value?.value,
												'min',
												'max'
											)}
									</p>
								);
							})}
					</div>
				);
			})}
			<p className='border-r border-slate-500 flex justify-center items-center'>
				<span>{item.result}</span>
			</p>

			<div className='w-[25px]'>
				{/* <RowOptions templateId={templateId} rowId={item._id} /> */}
			</div>
		</div>
	);
};

export default TemplateRow;
