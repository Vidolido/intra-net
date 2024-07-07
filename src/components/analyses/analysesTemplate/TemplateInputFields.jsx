import { Fragment } from 'react';

// state/actions
import { groupParameters } from '@/utils/templates/groupParameters';
import { generateUUID } from '@/utils/generateUUID';

// components
import DragSvg from '@/../public/drag.svg';
import TemplateInputHeaders from './TemplateInputHeaders';
import TableHead from '@/components/templates/templateComponents/TableHead';
import InputType from '@/components/inputs/InputType';

const TemplateInputFields = ({ template, settings, defaultLanguage }) => {
	let mutTemplate = groupParameters(template.template) || [];
	// console.log(settings, 'the settings');
	return (
		<table className='border-collapse  w-full'>
			<TemplateInputHeaders
				settings={settings}
				defaultLanguage={defaultLanguage}
			/>
			<tbody>
				{mutTemplate.map((item, index) => {
					if (item.isGroup == undefined && item.parameter) {
						return (
							<tr key={generateUUID()}>
								<td className='border px-2'>
									{item.parameter.propertyValue['en']}
								</td>
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
								<td className='outline outline-transparent outline-1 outline-offset-0  border w-[150px] hover:outline-red-300 bg-slate-200'>
									<InputType
										name={item.id}
										classes='w-[150px] border-0 rounded-none bg-slate-100'
									/>
								</td>
								{/* <td>{item.marginError}</td>
								<td>
									<RowOptions templateId={template._id} rowId={item._id} />
								</td> */}
							</tr>
						);
					}
					if (item.isGroup) {
						return item.items.map((collectionItem, i) => {
							return (
								<Fragment key={generateUUID()}>
									{i === 0 ? (
										<tr className='border-2 border-b border-slate-300'>
											<th colSpan={6} className='text-left'>
												{item.name['en']}
											</th>
										</tr>
									) : null}
									<tr
										className={`border-r-2 border-l-2 border-slate-300 ${
											i === item.items.length - 1 ? 'border-b-2' : null
										}`}>
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
										<td className='outline outline-transparent outline-1 outline-offset-0  border w-[150px] hover:outline-red-300 bg-slate-200'>
											<InputType
												name={item.id}
												classes='w-[150px] border-0 rounded-none bg-slate-100'
											/>
										</td>
										{/* <td>{item.marginError}</td>
										<td>
											<RowOptions
												templateId={template._id}
												rowId={collectionItem._id}
											/> 
										</td> */}
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

export default TemplateInputFields;
