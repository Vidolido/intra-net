// components
import DocumentType from './basic/DocumentType';
import Origin from './basic/Origin';
import Product from './basic/Product';
import SampleType from './basic/SampleType';
import TemplateFormInput from './inputForm/TemplateFormInput';
import TableHeaders from './inputForm/TableHeaders';
import SaveBasic from './basic/SaveBasic';
import DocumentStatus from './templateComponents/DocumentStatus';

const TemplateForm = ({
	languages,
	settings,
	draft,
	groups,
	templateSettings,
}) => {
	const defaultLanguage = {
		_id: '6656eed3b12adae590481cfe',
		language: 'en',
		locale: 'en-US',
	};
	let products = templateSettings.filter(
		(setting) => setting.settingName === 'Products'
	);
	let types = templateSettings.filter(
		(setting) => setting.settingName === 'Types'
	);
	let countries = templateSettings.filter(
		(setting) => setting.settingName === 'Countries'
	);

	return (
		<form className='w-fit bg-slate-100 flex flex-col gap-1 p-1'>
			<div className='flex justify-between bg-white'>
				<fieldset
					name='basic-input'
					className='flex gap-2 border border-slate-300 rounded w-fit p-2'>
					<Product
						products={products[0]}
						languages={languages}
						value={draft.product}
					/>
					<SampleType
						types={types[0]}
						defaultValue={draft.sampleType}
						none={true}
					/>
					<Origin countries={countries[0]} defaultValue={draft.origin} />
					<DocumentType types={types[0]} defaultValue={draft.documentType} />
					<SaveBasic draft={draft} />
				</fieldset>
				<DocumentStatus setting={draft} />
			</div>
			<div className='border border-slate-300 rounded w-fit p-1'>
				{/* <h5>Template Settings</h5> */}

				<div id='addTemplateSchema'>
					<TableHeaders settings={settings} defaultLanguage={defaultLanguage} />

					<TemplateFormInput
						document={draft._id}
						settings={settings}
						groups={groups}
						defaultLanguage={defaultLanguage}
					/>
				</div>
			</div>
		</form>
	);
};

export default TemplateForm;
