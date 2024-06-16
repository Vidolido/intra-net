// components
import DocumentType from './basic/DocumentType';
import Origin from './basic/Origin';
import Product from './basic/Product';
import SampleType from './basic/SampleType';
import TemplateFormInput from './inputForm/TemplateFormInput';
import TableHeaders from './inputForm/TableHeaders';
import SaveBasic from './basic/SaveBasic';

const TemplateForm = ({ languages, settings, draft, templateSettings }) => {
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
	// console.log(products[0], 'in templateForm');
	let test = products[0]?.settings.filter(
		(setting) => setting._id === draft.product
	);
	console.log(test[0]?._id, 'the test');
	console.log(draft.product, 'the draft');

	return (
		<form className='w-fit bg-slate-100 flex flex-col gap-1 p-1'>
			<h4>Template Form</h4>
			<div className='flex gap-2 border border-slate-300 rounded w-fit p-2'>
				<Product
					products={products[0]}
					languages={languages}
					value={test[0]?._id}
				/>
				<SampleType types={types[0]} />
				<Origin countries={countries[0]} />
				<DocumentType types={types[0]} />
				<SaveBasic draft={draft} />
			</div>
			<div className='border border-slate-300 rounded w-fit p-2'>
				<h5>Template Settings</h5>

				<div id='addTemplateSchema'>
					<TableHeaders settings={settings} defaultLanguage={defaultLanguage} />

					<TemplateFormInput
						document={draft._id}
						settings={settings}
						defaultLanguage={defaultLanguage}
					/>
				</div>
			</div>
		</form>
	);
};

export default TemplateForm;
