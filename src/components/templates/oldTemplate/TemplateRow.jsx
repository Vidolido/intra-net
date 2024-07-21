'use client';

// state/actions
import { useLaboratoryContext } from '@/state/laboratoryContext';
import { deleteTemplateRow } from '@/serverActions/laboratoryTemplates/deleteTemplateRow';

// comnponents
import ContextButton from '../../buttons/ContextButton';
import DragSvg from '@/../public/drag.svg';

const TemplateRow = ({ item, document }) => {
	const handleDelete = async (rowId, document) => {
		await deleteTemplateRow(rowId, document);
	};
	// console.log(item, 'the item');
	return (
		<div key={item._id} className='grid grid-cols-8 gap-4'>
			<div className='w-[20px] align-top cursor-pointer truncate colspan-start-auto'>
				<DragSvg className='text-slate-400 hover:text-red-600 text-center w-[25px] h-[25px] cursor-pointer' />
			</div>
			<div className='truncate px-2'>
				<p className='whitespace-nowrap'>
					{item?.parameter?.propertyValue['en']}
				</p>
			</div>
			{item.items &&
				Object.entries(item?.items).map((item) => {
					return (
						<div key={item[0]} className='truncate border-l'>
							{item[1].map((row) => (
								<p key={row.id} className='whitespace-nowrap truncate'>
									{(typeof row.value === 'string' && row.value) ||
										row.value['en'] ||
										`${row?.value?.key} - ${row?.value?.value}`}
									{/* {} */}
								</p>
							))}
						</div>
					);
				})}
			<p>{item.result}</p>
			<p>{item.marginError}</p>
			<ContextButton
				label='delete'
				type='default'
				onClick={() => handleDelete(item._id, document)}
				classes='self-start'
			/>
		</div>
	);
};

export default TemplateRow;
