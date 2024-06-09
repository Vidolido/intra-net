import SelectInput from '@/components/inputs/SelectInput';
import { sampleTypes } from './sampleTypes';

const SampleType = () => {
	const analysesTypes = sampleTypes;
	return (
		<fieldset>
			<h6>Sample Type</h6>
			<SelectInput options={analysesTypes} defaultLanguage='en' />
		</fieldset>
	);
};

export default SampleType;
