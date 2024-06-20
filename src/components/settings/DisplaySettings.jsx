'use client';
import { useSettingsContext } from '@/state/settingsContext';
import { generateUUID } from '@/utils/generateUUID';
import { getDisplayHeadings } from '@/utils/getDisplayHeadings';
import { Fragment } from 'react';
import ContextButton from '../buttons/ContextButton';
import ActionButtons from '../buttons/ActionButtons';
import { deleteSetting } from '@/serverActions/settings/deleteSetting';

const DisplaySettings = ({ languages, setting: dbSetting }) => {
	const { defaultLanguage } = useSettingsContext();
	const { settings } = dbSetting;

	let headings =
		(settings && getDisplayHeadings(settings[0], 'singular')) || null;

	return (
		<div>
			<table className='border-collapse'>
				<thead>
					<tr>
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
									<tr>
										<td className='border text-left p-3'>
											{setting?.parameter?.inputValue['en']}
										</td>
										{collections.map((collection, ind) => {
											return (
												<td
													key={collection._id}
													className='border text-left p-3'>
													{collection &&
														collection.items &&
														collection?.items.map((item, i) => {
															return (
																<p key={generateUUID()}>
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
										})}
										<td>
											{/* <ContextButton label='delete' type='default' /> */}
											<ActionButtons
												label='delete'
												action={deleteSetting}
												parameters={{
													setting: setting._id,
													document: dbSetting._id,
												}}
											/>
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
