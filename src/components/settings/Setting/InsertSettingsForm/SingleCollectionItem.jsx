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
		setState((prev) => {
			let updatedCollections = prev.collections.map((coll) => {
				if (coll._id === selectedCollection) {
					return {
						...coll,
						items: coll.items.filter(
							(item) => item?.id !== id && item?._id !== id
						),
					};
				}
				return coll;
			});

			return {
				...prev,
				collections: updatedCollections,
			};
		});
	};
	// console.log(state, 'the state');

	// const handleDelete = (id) => {
	//   console.log(id, 'the id');
	//   console.log(state.collections, 'the state.collections');
	//   let collections = [...state?.collections] || [];
	//   collections.reduce((acc, currentValue) => {
	//     console.log(currentValue, 'the current value');
	//     if (
	//       currentValue.collectionId !== selectedCollection ||
	//       currentValue._id !== selectedCollection
	//     ) {
	//       acc.push(currentValue);
	//     } else {
	//       currentValue.items = currentValue.items.filter(
	//         (item) => item._id !== id || item.id !== id
	//       );
	//       acc.push(currentValue);
	//     }
	//     return acc;
	//   }, []);

	//   setState((prev) => ({
	//     ...prev,
	//     collections,
	//   }));
	// };

	console.log(item, 'the ITEM');
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
