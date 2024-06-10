import { Fragment } from 'react';

// state/actions
import { getDisplayHeadings } from '@/utils/getDisplayHeadings';
import { generateUUID } from '@/utils/generateUUID';
import { useSettingsContext } from '@/state/settingsContext';
import { nameArray } from '@/utils/nameArray';

// components
import LanguageInputContainer from '../inputs/LanguageInputContainer';
import SelectInput from '../inputs/SelectInput';
import DocumentType from './basic/DocumentType';
import Origin from './basic/Origin';
import Product from './basic/Product';
import SampleType from './basic/SampleType';
import TemplateFormInput from './inputForm/TemplateFormInput';
import TableHeaders from './inputForm/TableHeaders';

const TemplateForm = ({ languages, settings }) => {
	const defaultLanguage = {
		_id: '6656eed3b12adae590481cfe',
		language: 'en',
		locale: 'en-US',
	};
	let headings =
		(settings && getDisplayHeadings(settings[0], 'plural')) || null;
	//   console.log(headings, 'the headings');

	let properties = settings.map((setting) => ({
		_id: setting._id,
		name: { ...setting.parameter.inputValue },
	}));
	// console.log(properties, 'THE PROPERTIES');
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

				<div id='addTemplateSchema'>
					<TableHeaders settings={settings} defaultLanguage={defaultLanguage} />

					<TemplateFormInput
						settings={settings}
						defaultLanguage={defaultLanguage}
					/>
					{/* <div className='grid grid-cols-6 gap-4'>
						<div>
							<SelectInput
								options={properties}
								defaultLanguage={defaultLanguage.language}
								classes='min-w-[100px]'
							/>
						</div>
					</div> */}
					{/* {settings &&
						settings?.map((setting) => {
							let collections = setting.collections;
							let namesArray = nameArray(setting?.parameter?.inputValue);
						
							return (
								<div key={generateUUID()} className='grid grid-cols-6 gap-4'>
									<p>{setting?.parameter?.inputValue['en']}</p>

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
						})} */}
				</div>
			</div>
		</form>
	);
};

export default TemplateForm;
