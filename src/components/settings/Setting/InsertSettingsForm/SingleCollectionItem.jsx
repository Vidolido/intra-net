import { useState } from 'react';

// components
import ContextButton from '@/components/buttons/ContextButton';
import EditCollectionItem from './EditCollectionItem';
import { formatKeyValue } from '@/utils/settings/formatKeyValue';

const SingleCollectionItem = ({
	languages,
	state,
	setState,
	selectedCollection,
	item,
}) => {
	const [canEdit, setCanEdit] = useState({
		edit: false,
		id: null,
		value: null,
	});

	const handleSave = (id) => {
		console.log(id);
		setCanEdit({
			edit: false,
			id: null,
			value: null,
		});
	};

	const handleEdit = (id) => {
		console.log(id);
		setCanEdit({
			...canEdit,
			edit: true,
			id,
		});
	};

	const handleDelete = (id) => {
		setState((prev) => ({
			...prev,
			collections: {
				...prev.collections,
				[selectedCollection]: prev.collections[selectedCollection].filter(
					(item) => item.id !== id
				),
			},
		}));
	};

	return (
		<li className='list-disc border border-slate-50 hover:border-red-200 focus:outline-none'>
			<div className='flex justify-between gap-2'>
				{canEdit.id !== item.id ? (
					<span className='block border-l border-slate-300 px-2'>
						{(typeof item.value === 'string' && item.value) ||
							item.value[languages[0].language] ||
							formatKeyValue(item?.value?.key, item?.value?.value)}
					</span>
				) : (
					<EditCollectionItem
						languages={languages}
						state={state}
						setState={setState}
						selectedCollection={selectedCollection}
						item={item}
					/>
				)}
				<div>
					{canEdit.id !== item.id ? (
						<ContextButton
							label='edit'
							type='default'
							onClick={() => handleEdit(item.id)}
							classes='border-l border-slate-300 px-2'
						/>
					) : (
						<ContextButton
							label='save'
							type='default'
							classes='border-l border-slate-300 px-2'
							onClick={() => handleSave(item.id)}
						/>
					)}
					<ContextButton
						label='delete'
						type='default'
						onClick={() => handleDelete(item.id)}
						classes='border-l border-slate-300 px-2'
					/>
				</div>
			</div>
		</li>
	);
};

export default SingleCollectionItem;
