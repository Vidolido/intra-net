'use client';
import { Fragment, useEffect, useMemo, useState } from 'react';

// state/actions
import { useSettingsContext } from '@/state/settingsContext';
import { deleteSetting } from '@/serverActions/settings/deleteSetting';
import { getDisplayHeadings } from '@/utils/getDisplayHeadings';
import { generateUUID } from '@/utils/generateUUID';

// components
import ContextButton from '../buttons/ContextButton';
import ActionButtons from '../buttons/ActionButtons';
import DragSvg from '@/../public/drag.svg';
import OptionsSvg from '@/../public/options.svg';
import EditSetingForm from './editSetting/EditSetingForm';

const DisplaySettings = ({ languages, setting: dbSetting }) => {
	const { defaultLanguage } = useSettingsContext();
	const { settings } = dbSetting;
	let mutSettings = useMemo(
		() =>
			settings.reduce((acc, currentValue) => {
				acc = {
					...acc,
					[currentValue._id]: {
						showOptions: false,
						expand: false,
						edit: false,
					},
				};
				return acc;
			}, {}),
		[settings]
	);
	// const [showOptions, setShowOptions] = useState(false);
	// const [expand, setExpand] = useState(mutSettings);
	// console.log(mutSettings, 'before');
	const [options, setOptions] = useState(mutSettings);

	// console.log(Object.keys(options).length !== Object.keys(mutSettings), 'test');
	useEffect(() => {
		if (Object.keys(options).length !== Object.keys(mutSettings))
			setOptions(mutSettings);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mutSettings]);

	let headings =
		(settings && getDisplayHeadings(settings[0], 'singular')) || null;

	const handleShowOptions = (e) => {
		// console.log(options, 'options in handleShowOptions');
		setOptions((prev) => {
			if (e in prev) {
				return {
					...prev,
					[e]: {
						...prev[e],
						showOptions: !prev[e].showOptions,
					},
				};
			}
			return prev;
		});
	};

	const handleEdit = (e) => {
		// setOptions((prev) => {
		// 	if (e in prev) {
		// 		return {
		// 			...prev,
		// 			[e]: {
		// 				...prev[e],
		// 				edit: !prev[e].expand,
		// 			},
		// 		};
		// 	}
		// });
		setOptions((prev) => {
			return {
				...prev,
				[e]: {
					...prev[e],
					edit: !prev[e].edit,
				},
			};
		});
		// return prev;
	};

	const handleExpand = (e) => {
		setOptions((prev) => {
			return {
				...prev,
				[e]: {
					...prev[e],
					expand: !prev[e].expand,
				},
			};
		});
	};

	const handleDelete = async (_id) => {
		setOptions((prev) => {
			const newOptions = { ...prev };
			delete newOptions[_id];
			return newOptions;
		});
		await deleteSetting({
			setting: _id,
			document: dbSetting._id,
		});
	};
	// console.log(options, 'options');
	// console.log(mutSettings, 'after');

	return (
		<div>
			<table>
				<thead>
					<tr>
						<td></td>
						{headings && headings.main && (
							<th className='border w-fit text-left px-3'>
								{headings?.main[defaultLanguage.language]}
							</th>
						)}

						{headings &&
							headings?.collections &&
							headings?.collections?.map((collection, index) => (
								<th key={index} className='border w-fit text-left px-3'>
									{collection[defaultLanguage.language]}
								</th>
							))}
					</tr>
				</thead>
				<tbody>
					{settings &&
						settings?.map((setting, index) => {
							let collections = setting.collections;
							return (
								<Fragment key={setting._id}>
									{options[setting._id] !== undefined &&
									options[setting._id].edit ? (
										<tr>
											<td></td>
											<td colSpan={collections.length + 2}>
												<EditSetingForm
													languages={languages}
													setting={setting}
												/>
											</td>
										</tr>
									) : (
										''
									)}

									<tr className='border-b hover:border-red-300 hover:nth-ch'>
										<td className='w-fit align-top cursor-pointer'>
											<DragSvg className='text-slate-400 hover:text-red-600 text-center w-[25px] h-[25px] cursor-pointer' />
										</td>
										<td className='text-left align-top px-2 '>
											{setting?.parameter?.inputValue['en']}
										</td>
										{collections.map((collection, ind) => {
											if (
												options[setting._id] !== undefined &&
												!options[setting._id].expand
											) {
												return (
													<td
														key={collection._id}
														className='text-left align-top px-2 '>
														{collection &&
															collection.items &&
															collection?.items.map((item, i) => {
																if (i > 0) return;
																return (
																	<p key={item.id}>
																		{' '}
																		{(typeof item.value === 'string' &&
																			item.value) ||
																			item.value[defaultLanguage.language] ||
																			`${item?.value?.key} - ${item?.value?.value}`}
																	</p>
																);
															})}
													</td>
												);
											} else {
												return (
													<td
														key={collection._id}
														className='text-left align-top px-2'>
														{collection &&
															collection.items &&
															collection?.items.map((item, i) => {
																return (
																	<p key={item.id}>
																		{' '}
																		{(typeof item.value === 'string' &&
																			item.value) ||
																			item.value[defaultLanguage.language] ||
																			`${item?.value?.key} - ${item?.value?.value}`}
																	</p>
																);
															})}
													</td>
												);
											}
										})}

										<td className='cursor-pointer align-top relative'>
											<OptionsSvg
												onClick={() => handleShowOptions(setting?._id)}
												className='text-slate-400 hover:text-red-600 text-center w-[25px] h-[25px]'
											/>
											<div
												className={`flex flex-col absolute top-0 right-[-65px] ${
													options[setting._id] &&
													options[setting._id].showOptions
														? 'visible'
														: 'hidden'
												}`}>
												<ContextButton
													label='expand'
													type='default'
													onClick={() => handleExpand(setting?._id)}
												/>
												<ContextButton
													label='edit'
													type='default'
													onClick={() => handleEdit(setting?._id)}
												/>
												<ContextButton
													label='delete'
													type='default'
													onClick={() => handleDelete(setting?._id)}
												/>
												{/* <ActionButtons
													label='delete'
													action={deleteSetting}
													parameters={{
														setting: setting?._id,
														document: dbSetting._id,
													}}
												/> */}
											</div>
										</td>
									</tr>
								</Fragment>
							);
						})}
				</tbody>
				<tfoot></tfoot>
			</table>
		</div>
	);
};

export default DisplaySettings;

// if (
// 	setting._id in expand &&
// 	expand[setting._id]
// ) {

// }
// if (
// 	setting._id in expand &&
// 	!expand[setting._id]
// ) {
// 	<p key={item[0]}>
// 		{' '}
// 		{(typeof item[].value === 'string' &&
// 			item.value) ||
// 			item.value[defaultLanguage.language] ||
// 			`${item?.value?.key} - ${item?.value?.value}`}
// 	</p>;
// }
