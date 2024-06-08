'use client';
import { useSettingsContext } from '@/state/settingsContext';
import { createRandomNumber } from '@/utils/functions';
import { generateUUID } from '@/utils/generateUUID';
import { getDisplayHeadings } from '@/utils/getDisplayHeadings';
import { Fragment } from 'react';

const DisplaySettings = ({ languages, setting }) => {
	// const { defaultLanguage } = useSettingsContext();
	const { defaultLanguage } = useSettingsContext();
	const { settings } = setting;

	let headings = (settings && getDisplayHeadings(settings[0])) || null;
	// console.log(headings, 'the  headings');
	// console.log(settings, 'THE SETTINGS');
	// console.log(dbSettings, 'THE dbSettings');
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
								<Fragment key={generateUUID()}>
									<tr key={generateUUID()}>
										<td className='border text-left p-3'>
											{setting?.parameter?.inputValue['en']}
										</td>
										{collections.map((collection, ind) => {
											return (
												<td
													key={generateUUID()}
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
