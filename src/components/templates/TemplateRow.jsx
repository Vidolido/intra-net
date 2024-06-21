'use client';

// state/actions
import { deleteTemplateRow } from '@/serverActions/laboratoryTemplates/deleteTemplateRow';

// comnponents
import ContextButton from '../buttons/ContextButton';
import { useLaboratoryContext } from '@/state/laboratoryContext';

const TemplateRow = ({ item, document }) => {
	const handleDelete = async (rowId, document) => {
		await deleteTemplateRow(rowId, document);
	};
	console.log(item, 'the item');
	return (
		<div key={item._id} className='grid grid-cols-7 gap-4 mb-1'>
			<p>{item?.parameter?.propertyValue['en']}</p>
			{item.items &&
				Object.entries(item?.items).map((item) => {
					return (
						<div key={item[0]}>
							{item[1].map((row) => (
								<p key={row.id}>
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
				type='edit'
				onClick={() => handleDelete(item._id, document)}
			/>
		</div>
	);
};

export default TemplateRow;
