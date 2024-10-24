import { Fragment } from 'react';

// state/actions
import { groupParameters } from '@/utils/templates/groupParameters';
import { generateUUID } from '@/utils/generateUUID';

// components
import TemplateInputHeaders from './TemplateInputHeaders';
import InputType from '@/components/inputs/InputType';
import ContextButton from '@/components/buttons/ContextButton';
import { formatKeyValue } from '@/utils/settings/formatKeyValue';

const TemplateInputFields = ({
	template,
	laboratorySettings,
	defaultLanguage,
}) => {
	// let mutTemplate = groupParameters(template?.template || template) || [];
	let mutTemplate = groupParameters(template) || [];

	return (
		<table className='border-collapse w-full'>
			<TemplateInputHeaders
				template={template}
				laboratorySettings={laboratorySettings}
				defaultLanguage={defaultLanguage}
			/>
			<tbody>
				{mutTemplate.map((item) => {
					if (item.isGroup == undefined && item.parameter) {
						return (
							<tr key={item?._id || generateUUID()}>
								<td className='border px-2'>{item?.parameter?.name?.en}</td>
								{Object.entries(item.collections).map(([_id, collection]) => {
									return (
										<td key={_id} className='text-left align-top px-2 border'>
											{collection &&
												collection.map((collectionItem) => {
													return (
														<p key={collectionItem.id || collectionItem._id}>
															{(typeof collectionItem.value === 'string' &&
																collectionItem.value) ||
																collectionItem.value[
																	defaultLanguage.language
																] ||
																formatKeyValue(
																	collectionItem?.value?.key,
																	collectionItem?.value?.value,
																	'min',
																	'max'
																)}
														</p>
													);
												})}
										</td>
									);
								})}
								<td className='outline outline-transparent outline-1 outline-offset-0 w-[150px] border-[0px] hover:outline-red-300 bg-slate-200'>
									<div className='flex flex-stretch'>
										<InputType
											name={item._id}
											defaultValue={item.result}
											classes='w-full border-[0px] rounded-none bg-slate-100'
										/>
									</div>
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
											{collectionItem?.parameter?.name['en']}
										</td>
										{Object.entries(collectionItem?.collections).map(
											([_id, collection]) => {
												return (
													<td
														key={_id || generateUUID()}
														className='text-left align-top px-2 border'>
														{collection &&
															collection.map((collectionItem) => {
																return (
																	<p key={collectionItem._id}>
																		{' '}
																		{(typeof collectionItem.value ===
																			'string' &&
																			collectionItem.value) ||
																			collectionItem.value[
																				defaultLanguage.language
																			] ||
																			formatKeyValue(
																				collectionItem?.value?.key,
																				collectionItem?.value?.value,
																				'min',
																				'max'
																			)}
																	</p>
																);
															})}
													</td>
												);
											}
										)}
										<td className='outline outline-transparent outline-1 outline-offset-0 w-[150px] border-[0px] hover:outline-red-300 bg-slate-200'>
											<div className='flex flex-stretch'>
												<InputType
													name={collectionItem._id}
													defaultValue={collectionItem.result}
													classes='w-full border-[0px] rounded-none bg-slate-100'
												/>
											</div>
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
				<tr>
					<td>
						<ContextButton
							label='Save'
							type='edit'
							onClick={(e) => e.target.form.requestSubmit()}
						/>
					</td>
				</tr>
			</tbody>
			<tfoot></tfoot>
		</table>
	);
};

export default TemplateInputFields;
