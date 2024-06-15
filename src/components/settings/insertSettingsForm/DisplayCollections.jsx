'use client';

// state/context
import {
	EDIT_COLLECTION_ITEM,
	REMOVE_FROM_COLLECTION,
} from '@/state/actionTypes';
import {
	useSettingsContext,
	useSettingsDispatchContext,
} from '@/state/settingsContext';

// utils

// components
import ContextButton from '@/components/buttons/ContextButton';
import CollectionInput from './CollectionInput';
import { useState } from 'react';
import SingleItem from './SingleItem';

const DisplayCollections = ({ languages, defaultLanguage }) => {
	const dispatch = useSettingsDispatchContext();
	const { selectedCollection, optionsSchema } = useSettingsContext();
	const { collections } = optionsSchema;

	// const [canEdit, setCanEdit] = useState({
	// 	edit: false,
	// 	id: null,
	// 	value: null,
	// });

	// const handleChange = (e, one, two, three) => {
	// 	console.log(e.target.value, one, two, three);
	// 	dispatch({
	// 		type: EDIT_COLLECTION_ITEM,
	// 		payload: {
	// 			id: one,
	// 			value: e.target.value,
	// 		},
	// 	});
	// };

	// const handleDelete = (item) => {
	// 	dispatch({
	// 		type: REMOVE_FROM_COLLECTION,
	// 		payload: {
	// 			state: 'optionsSchema',
	// 			value: item,
	// 			more: {
	// 				property: 'collections',
	// 			},
	// 		},
	// 	});
	// };

	// const handleEdit = (id) => {
	// 	// console.log(id);
	// 	setCanEdit({
	// 		edit: true,
	// 		id,
	// 	});
	// };

	// const handleSave = (id, value) => {
	// 	dispatch({
	// 		type: EDIT_COLLECTION_ITEM,
	// 		payload: {
	// 			id,
	// 			value,
	// 		},
	// 	});
	// 	setCanEdit({
	// 		edit: false,
	// 		id: null,
	// 	});
	// };
	return (
		<fieldset name='collection-items'>
			<ul className='pl-5 flex flex-col gap-1'>
				{collections &&
					collections[selectedCollection]?.items?.map((item) => (
						<SingleItem key={item.id} item={item} languages={languages} />
					))}
			</ul>
		</fieldset>
	);
};

export default DisplayCollections;
{
	/* {collections &&
					collections[selectedCollection]?.items?.map((item) => {
						console.log(item.inputType);
						return (
							<li
								className='list-disc border border-slate-50 hover:border-red-200 focus:outline-none'
								key={item.id}>
								<div className='flex justify-between gap-2'>
									{canEdit.id !== item.id ? (
										<span className='block border-l border-slate-300 px-2'>
											{(typeof item.value === 'string' && item.value) ||
												item.value[defaultLanguage.language] ||
												`${item?.value?.key} - ${item?.value?.value}`}
										</span>
									) : (
										<CollectionInput
											languages={languages}
											inputType={item.inputType}
											name='items-collections'
											values={item}
											onChange={(e) =>
												handleChange(e, item.id, item.value, item.inputType)
											}
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
					})} */
}
