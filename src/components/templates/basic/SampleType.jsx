import SelectInput from '@/components/inputs/SelectInput';
import { findSettingType } from '@/utils/findSettingType';
import { nameArray } from '@/utils/nameArray';

const SampleType = ({ types }) => {
	let sampleTypes = findSettingType(types.settings, ['sample']);
	let names = sampleTypes?.map((setting) => ({
		id: setting.id,
		...nameArray(setting.parameter.inputValue),
	}));

	// console.log(names);

	return (
		<fieldset name='sample-types'>
			<h6>Sample Type</h6>

			<SelectInput
				options={names}
				value='id'
				defaultLanguage='en'
				none={true}
			/>
		</fieldset>
	);
};

export default SampleType;
