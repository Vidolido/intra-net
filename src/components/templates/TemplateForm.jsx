import { getDisplayHeadings } from '@/utils/getDisplayHeadings';
import DocumentType from './basic/DocumentType';
import Origin from './basic/Origin';
import Product from './basic/Product';
import SampleType from './basic/SampleType';
import { Fragment } from 'react';
import { generateUUID } from '@/utils/generateUUID';
import { useSettingsContext } from '@/state/settingsContext';
import SelectInput from '../inputs/SelectInput';
import { nameArray } from '@/utils/nameArray';

const TemplateForm = ({ settings }) => {
	const defaultLanguage = {
		_id: '6656eed3b12adae590481cfe',
		language: 'en',
		locale: 'en-US',
	};
	let headings =
		(settings && getDisplayHeadings(settings[0], 'plural')) || null;
	console.log(headings, 'the headings');
	return (
		<form>
			<h4>Template Form</h4>
			<div>
				<Product />
				<SampleType />
				<Origin />
				<DocumentType />
			</div>
			<div className='w-[800px]'>
				<h5>Template Settings</h5>
				{/* <table className='border-collapse'>
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
				</table> */}
				<div id='addTemplateSchema'>
					{/* <div id='headings' className='flex gap-2'> */}
					<div id='headings' className='grid grid-cols-6 gap-4'>
						{headings && headings.main && (
							<h6>{headings?.main[defaultLanguage.language]}</h6>
						)}
						{headings &&
							headings?.collections &&
							headings?.collections?.map((collection, index) => (
								<h6 key={index}>{collection[defaultLanguage.language]}</h6>
							))}
						<h6>Default Value</h6>
						<h6>Margin of Error</h6>
					</div>
					{settings &&
						settings?.map((setting) => {
							let collections = setting.collections;
							let namesArray = nameArray(setting?.parameter?.inputValue);
							console.log(namesArray, 'THE  NAMES ARRAY');
							console.log(
								setting?.parameter?.inputValue,
								'THE setting?.parameter?.inputValue'
							);
							return (
								<div key={generateUUID()} className='grid grid-cols-6 gap-4'>
									{/* <div key={generateUUID()} className='flex gap-2 w-fit'> */}
									{/* <p>{setting?.parameter?.inputValue['en']}</p> */}
									{/* <SelectInput
										options={namesArray}
										value={defaultLanguage.language}
										classes='min-w-fit'
									/> */}
									{collections &&
										collections?.map((collection) => {
											return (
												<div key={generateUUID()}>
													{collection.items &&
														collection.items.map((item, i) => {
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
												</div>
											);
										})}
								</div>
							);
						})}
				</div>

				{/* {settings &&
					settings?.map((setting) => {
						return (
							<p key={setting._id}>{setting.parameter.name.singular['en']}</p>
						);
					})} */}
			</div>
		</form>
	);
};

export default TemplateForm;
