'use client';

// state/actions
import {
	EDIT_COLLECTION_ITEM,
	REMOVE_FROM_COLLECTION,
} from '@/state/actionTypes';
import {
	useEditSettingsContext,
	useEditSettingsDispatchContext,
} from '@/state/settings/editSetting/editSettingsState';
import { deleteSetting } from '@/serverActions/settings/deleteSetting';

// comnponents
import OptionsSvg from '@/../public/options.svg';
import ContextButton from '@/components/buttons/ContextButton';

const RowOptions = ({ setting, document }) => {
	const dispatch = useEditSettingsDispatchContext();
	const { options } = useEditSettingsContext();

	const handleShowOptions = (_id) => {
		// console.log(_id);
		let option = options[_id];
		// option.showOptions = !option.showOptions;
		dispatch({
			type: EDIT_COLLECTION_ITEM,
			payload: {
				state: 'options',
				id: _id,
				value: {
					key: 'showOptions',
					value: !option.showOptions,
				},
			},
		});
	};
	const handleExpand = (_id) => {
		// console.log(_id);
		let option = options[_id];

		dispatch({
			type: EDIT_COLLECTION_ITEM,
			payload: {
				state: 'options',
				id: _id,
				value: {
					key: 'expand',
					value: !option.expand,
				},
			},
		});
	};
	const handleEdit = (_id) => {
		// console.log(_id);
		let option = options[_id];

		dispatch({
			type: EDIT_COLLECTION_ITEM,
			payload: {
				state: 'options',
				id: _id,
				value: {
					key: 'edit',
					value: !option.edit,
				},
			},
		});
	};

	const handleDelete = async (_id) => {
		dispatch({
			type: REMOVE_FROM_COLLECTION,
			payload: {
				state: 'options',
				id: _id,
			},
		});

		await deleteSetting({
			setting: _id,
			document: document._id,
		});
	};
	// console.log(options, 'mutSettings as options in RowOptions');
	return (
		<td className='cursor-pointer align-top relative'>
			<OptionsSvg
				onClick={() => handleShowOptions(setting)}
				className='text-slate-400 hover:text-red-600 text-center w-[25px] h-[25px]'
			/>
			<div
				className={`flex flex-col absolute top-0 right-[-65px] ${
					options &&
					options[setting] !== undefined &&
					options[setting].showOptions
						? 'visible'
						: 'hidden'
				}`}>
				<ContextButton
					label='expand'
					type='default'
					onClick={() => handleExpand(setting)}
				/>
				<ContextButton
					label='edit'
					type='default'
					onClick={() => handleEdit(setting)}
				/>
				<ContextButton
					label='delete'
					type='default'
					onClick={() => handleDelete(setting)}
				/>
			</div>
		</td>
	);
};

export default RowOptions;
