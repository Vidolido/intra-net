// state/actions
import { saveBasicData } from '@/serverActions/laboratoryTemplates/saveBasicData';

// components
import DocumentType from '../basic/DocumentType';
import Origin from '../basic/Origin';
import Product from '../basic/Product';
import SampleType from '../basic/SampleType';
import DocumentStatus from './DocumentStatus';

const Header = ({ languages, templateSettings, template }) => {
	let products = templateSettings.find(
		(setting) => setting.settingName === 'Products'
	);
	let types = templateSettings.find(
		(setting) => setting.settingName === 'Types'
	);
	let countries = templateSettings.find(
		(setting) => setting.settingName === 'Countries'
	);

	const submit = saveBasicData.bind(null, template._id);
	return (
		<form action={submit}>
			<fieldset
				name='basic-input'
				className='flex gap-2 border border-slate-300 rounded w-fit p-2'>
				<Product
					name='product'
					products={products}
					languages={languages}
					value={template.product}
				/>
				<SampleType
					name='sampleType'
					types={types}
					defaultValue={template.sampleType}
					none={true}
				/>
				<Origin
					name='origin'
					countries={countries}
					defaultValue={template.origin}
				/>
				<DocumentType
					name='documentType'
					types={types}
					defaultValue={template.documentType}
				/>
				<DocumentStatus template={template} />
				<button
					type='submit'
					className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-semibold py-[2.5px] px-4 rounded self-end'>
					Save
				</button>
			</fieldset>
		</form>
	);
};

export default Header;
