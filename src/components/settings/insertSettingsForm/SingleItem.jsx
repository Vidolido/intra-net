'use client';
import { useState } from 'react';

// state/actions
import { useSettingsDispatchContext } from '@/state/settingsContext';
import {
	EDIT_COLLECTION_ITEM,
	REMOVE_FROM_COLLECTION,
} from '@/state/actionTypes';

// components
import ContextButton from '@/components/buttons/ContextButton';
import CollectionInput from './CollectionInput';

const SingleItem = ({ item, languages }) => {
	const dispatch = useSettingsDispatchContext();
	const [canEdit, setCanEdit] = useState({
		edit: false,
		id: null,
		value: null,
	});
	const [itemValue, setItemValue] = useState(item.value);
	// let value = item.value;

	const handleChange = (e, inputType) => {
		// let isLanguageInput =
		// 	itemValue && itemValue[languages[0].language] !== undefined;
		if (inputType === 'simple') {
			setItemValue(e.target.value);
		}
		if (inputType === 'translations') {
			setItemValue((prev) => ({
				...prev,
				[e.target.name]: e.target.value,
			}));
		}
		if (inputType === 'key/value') {
			setItemValue((prevState) => ({
				...prevState,
				[e.target.name]: e.target.value,
			}));
		}
	};

	const handleDelete = (item) => {
		dispatch({
			type: REMOVE_FROM_COLLECTION,
			payload: {
				state: 'optionsSchema',
				value: item,
				more: {
					property: 'collections',
				},
			},
		});
	};

	const handleEdit = (id) => {
		setCanEdit({
			edit: true,
			id,
		});
	};

	const handleSave = (id) => {
		dispatch({
			type: EDIT_COLLECTION_ITEM,
			payload: {
				id,
				itemValue,
			},
		});
		setCanEdit({
			edit: false,
			id: null,
		});
	};
	console.log(itemValue, 'the itemValue');
	return (
		<li
			className='list-disc border border-slate-50 hover:border-red-200 focus:outline-none'
			key={item.id}>
			<div className='flex justify-between gap-2'>
				{canEdit.id !== item.id ? (
					<span className='block border-l border-slate-300 px-2'>
						{(typeof itemValue === 'string' && itemValue) ||
							itemValue[languages[0].language] ||
							`${itemValue.key} - ${itemValue.value}`}
					</span>
				) : (
					<CollectionInput
						languages={languages}
						inputType={item.inputType}
						name='items-collections'
						values={itemValue}
						onChange={(e) => handleChange(e, item.inputType)}
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

export default SingleItem;
