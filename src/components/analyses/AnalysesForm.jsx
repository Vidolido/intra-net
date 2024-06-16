'use client';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';
import { getLaboratorySettings, getLanguages } from '@/app/dashboard/apiCalls';
// import TemplateSelection from './TemplateSelection';
import TemplateSelect from './TemplateSelect';

const AnalysesForm = ({ templateSettings, languages, laboratoryTemplates }) => {
	// const [{ templateSettings }, { languages }, { settings }] = await Promise.all(
	// 	[getTemplateSettings(), getLanguages(), getLaboratorySettings()]
	// );
	// console.log(templateSettings, 'templateSettings  in  AnalysesForm')
	const products = templateSettings.filter(
		(setting) => setting.settingName === 'Products'
	);
	let types = templateSettings.filter(
		(setting) => setting.settingName === 'Types'
	);
	let countries = templateSettings.filter(
		(setting) => setting.settingName === 'Countries'
	);
	// console.log(products, 'products');
	return (
		<form>
			<TemplateSelect
				languages={languages}
				products={products[0]}
				types={types[0]}
				countries={countries[0]}
			/>
		</form>
	);
};

export default AnalysesForm;
