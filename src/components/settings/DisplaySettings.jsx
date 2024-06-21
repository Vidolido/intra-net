'use client';
import { Fragment, useState } from 'react';

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

const DisplaySettings = ({ languages, setting: dbSetting }) => {
	const { defaultLanguage } = useSettingsContext();
	const { settings } = dbSetting;
	const mutSettings = settings.reduce((acc, currentValue) => {
		acc = {
			...acc,
			[currentValue._id]: '',
		};
		return acc;
	}, {});
	const [showOptions, setShowOptions] = useState(false);
	const [expand, setExpand] = useState(mutSettings);
	let headings =
		(settings && getDisplayHeadings(settings[0], 'singular')) || null;

	const handleOptions = () => {
		setShowOptions(!showOptions);
	};

	const handleExpand = (e) => {
		console.log(e, 'e is expanding');
		setExpand((prev) => {
			if (e in prev) {
				return { ...prev, [e]: !prev[e] };
			} else {
				return {
					...prev,
					[e]: true,
				};
			}
		});
	};
	console.log(expand);
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
									{/* <tr>
										<td></td>
										<td>edit row</td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
									</tr> */}

									<tr className='border-b hover:border-red-300 hover:nth-ch'>
										<td className='w-fit align-top cursor-pointer'>
											<DragSvg className='text-slate-400 hover:text-red-600 text-center w-[25px] h-[25px] cursor-pointer' />
										</td>
										<td className='text-left align-top px-2 '>
											{setting?.parameter?.inputValue['en']}
										</td>
										{collections.map((collection, ind) => {
											{
												/* console.log(
												setting._id in expand,
												expand[setting._id],
												'AJ OVAJ'
											); */
											}
											if (setting._id in expand && !expand[setting._id]) {
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
											}
											if (setting._id in expand && expand[setting._id]) {
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
										{/* <td>
											<ActionButtons
												label='delete'
												action={deleteSetting}
												parameters={{
													setting: setting._id,
													document: dbSetting._id,
												}}
											/>
										</td> */}
										<td
											className='cursor-pointer align-top relative'
											onClick={handleOptions}
											// onClick={() => handleExpand(setting._id)}
										>
											<OptionsSvg className='text-slate-400 hover:text-red-600 text-center w-[25px] h-[25px]' />
											<div
												className={`absolute top-0 right-[-65px] ${
													showOptions ? 'visible' : 'hidden'
												}`}>
												testiranje
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
