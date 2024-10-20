// state/actions
import { saveBasicData } from '@/serverActions/laboratoryTemplates/saveBasicData';
import { mutateTemplateSettings } from '@/utils/settings/mutateTempalteSettings';

// components
import Product from './(headerOptions)/Product';
import SampleType from './(headerOptions)/SampleType';
import Origin from './(headerOptions)/Origin';
import DocumentType from './(headerOptions)/DocumentType';
import DocumentStatus from './(headerOptions)/DocumentStatus';

const Header = async ({ languages, templateSettings, template }) => {
	const { products, countries, types } =
		mutateTemplateSettings(templateSettings);

	const { header } = template;
	const submit = saveBasicData.bind(null, template._id);

	return (
		<form action={submit}>
			<fieldset
				name='basic-input'
				className='flex gap-2 border border-slate-300 rounded w-fit p-2'>
				<Product
					products={products}
					defaultValue={header?.product}
					languages={languages}
				/>
				<SampleType
					types={types}
					defaultValue={header?.sampleType}
					showEmptyOption={true}
					languages={languages}
				/>
				<Origin
					countries={countries}
					defaultValue={header?.origin}
					showEmptyOption={true}
					languages={languages}
				/>
				<DocumentType
					types={types}
					defaultValue={header?.documentType}
					languages={languages}
				/>
				<DocumentStatus
					// template={template}
					defaultValue={template.documentStatus}
					languages={languages}
				/>
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
