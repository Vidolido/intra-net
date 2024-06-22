'use client';

// state/actions
import { useEditSettingsContext } from '@/state/settings/editSetting/editSettingsState';

// components
import DragSvg from '@/../public/drag.svg';
import RowOptions from './RowOptions';
import { Fragment } from 'react';
import EditSetingForm from '../editSetting/EditSetingForm';

const TableRow = ({ languages, defaultLanguage, setting, document }) => {
	const { options } = useEditSettingsContext();
	let collections = setting.collections;
	// console.log(state, 'the state?');
	return (
		<Fragment>
			{options[setting._id] !== undefined && options[setting._id].edit ? (
				<tr>
					<td colSpan={collections.length + 3}>
						<EditSetingForm languages={languages} setting={setting} />
					</td>
				</tr>
			) : (
				''
			)}
			<tr className='border-b hover:border-red-300'>
				<td className='w-fit align-top cursor-pointer'>
					<DragSvg className='text-slate-400 hover:text-red-600 text-center w-[25px] h-[25px] cursor-pointer' />
				</td>
				<td className='text-left align-top px-2 '>
					{setting?.parameter?.inputValue['en']}
				</td>
				{collections.map((collection) => {
					return (
						<td key={collection._id} className='text-left align-top px-2 '>
							{collection.items &&
								collection?.items.map((item, i) => {
									if (
										options[setting._id] !== undefined &&
										!options[setting._id].expand &&
										i > 0
									)
										return;
									return (
										<p key={item.id}>
											{' '}
											{(typeof item.value === 'string' && item.value) ||
												item.value[defaultLanguage.language] ||
												`${item?.value?.key} - ${item?.value?.value}`}
										</p>
									);
								})}
						</td>
					);
				})}

				<RowOptions setting={setting} document={document} />
			</tr>
		</Fragment>
	);
};

export default TableRow;
