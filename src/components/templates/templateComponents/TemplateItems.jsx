// 'use client';
import { Fragment } from 'react';

// state/actions
import { generateUUID } from '@/utils/generateUUID';
import { groupParameters } from '@/utils/templates/groupParameters';

// components
import DragSvg from '@/../public/drag.svg';
import TableHead from './TableHead';
import RowOptions from './RowOptions';

const TemplateItems = ({ template, settings, defaultLanguage }) => {
	let mutTemplate = groupParameters(template.template) || [];
	return (
		<table className='border'>
			<TableHead
				template={template.template}
				settings={settings}
				defaultLanguage={defaultLanguage}
			/>
			<tbody>
				{mutTemplate.map((item, index) => {
					if (item.isGroup == undefined && item.parameter) {
						return (
							<tr key={generateUUID()}>
								<td className='w-[20px] align-top cursor-pointer'>
									<DragSvg className='text-slate-400 hover:text-red-600 text-center w-[25px] h-[25px] cursor-pointer' />
								</td>
								<td className='border'>{item.parameter.propertyValue['en']}</td>
								{Object.entries(item.items).map((collection) => {
									return (
										<td
											key={generateUUID()}
											className='text-left align-top px-2 border'>
											{collection[1] &&
												collection[1].map((collectionItem, i) => {
													return (
														<p key={collectionItem.id}>
															{' '}
															{(typeof collectionItem.value === 'string' &&
																collectionItem.value) ||
																collectionItem.value[
																	defaultLanguage.language
																] ||
																`${collectionItem?.value?.key} - ${collectionItem?.value?.value}`}
														</p>
													);
												})}
										</td>
									);
								})}
								<td>{item.result}</td>
								<td>{item.marginError}</td>
								<td>
									<RowOptions templateId={template._id} rowId={item._id} />
								</td>
							</tr>
						);
					}
					if (item.isGroup) {
						return item.items.map((collectionItem, i) => {
							return (
								<Fragment key={generateUUID()}>
									{i === 0 ? (
										<tr className='border-2 border-b border-slate-300'>
											<td className='w-fit align-top cursor-pointer'> </td>
											<th colSpan={8} className='text-left'>
												{item.name['en']}
											</th>
										</tr>
									) : (
										''
									)}
									<tr
										className={`border-r-2 border-l-2 border-slate-300 ${
											i === item.items.length - 1 ? 'border-b-2' : ''
										}`}>
										<td className='w-fit align-top cursor-pointer'>
											<DragSvg className='text-slate-400 hover:text-red-600 text-center w-[25px] h-[25px] cursor-pointer' />
										</td>

										<td className='border'>
											{collectionItem.parameter.propertyValue['en']}
										</td>
										{Object.entries(collectionItem.items).map((collection) => {
											console.log(collection[0]);
											return (
												<td
													key={generateUUID()}
													className='text-left align-top px-2 border'>
													{collection[1] &&
														collection[1].map((collectionItem, i) => {
															return (
																<p key={collectionItem.id}>
																	{' '}
																	{(typeof collectionItem.value === 'string' &&
																		collectionItem.value) ||
																		collectionItem.value[
																			defaultLanguage.language
																		] ||
																		`${collectionItem?.value?.key} - ${collectionItem?.value?.value}`}
																</p>
															);
														})}
												</td>
											);
										})}
										<td>{item.result}</td>
										<td>{item.marginError}</td>
										<td>
											<RowOptions
												templateId={template._id}
												rowId={collectionItem._id}
											/>
										</td>
									</tr>
								</Fragment>
							);
						});
					}
				})}
			</tbody>
		</table>
	);
};

export default TemplateItems;
