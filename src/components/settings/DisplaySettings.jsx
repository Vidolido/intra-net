'use client';
import { useSettingsContext } from '@/state/settingsContext';
import { createRandomNumber } from '@/utils/functions';
import { getDisplayHeadings } from '@/utils/getDisplayHeadings';

const DisplaySettings = ({ languages }) => {
	const { settings, defaultLanguage } = useSettingsContext();

	let headings = getDisplayHeadings(settings[0]) || null;
	//   console.log(headings, 'the  headings');
	// console.log(settings, 'THE SETTINGS');
	return (
		<div>
			<table className='border-collapse'>
				<thead>
					<tr>
						{headings.main && (
							<th className='border w-fit text-left px-3'>
								{headings?.main[defaultLanguage.language]}
							</th>
						)}

						{headings.collections &&
							headings?.collections.map((collection, index) => (
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
								<>
									{/* <tr>
                МЕСТО ЗА ЕДИТ ПАНЕЛ
									<td colSpan={4}>testiranje</td>
								</tr> */}
									<tr key={createRandomNumber(1, 999)}>
										<td className='border text-left p-3'>
											{setting?.parameter?.value['en']}
										</td>
										{collections.map((collection, ind) => {
											return (
												<td key={ind} className='border text-left p-3'>
													{collection?.items.map((item, i) => {
														return (
															<p key={i}>
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
								</>
							);
						})}
				</tbody>
				<tfoot></tfoot>
			</table>
		</div>
	);
};

export default DisplaySettings;
