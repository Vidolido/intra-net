import SelectInput from '@/components/inputs/SelectInput';
import { documentTypes } from './documentTypes';
import { findSettingType } from '@/utils/findSettingType';
import { nameArray } from '@/utils/nameArray';

const DocumentType = ({ types, onChange }) => {
	// const types = documentTypes;

	let documentTypes = findSettingType(types.settings, ['document']);
	let names = documentTypes?.map((setting) => ({
		id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));

	// console.log(names);
	return (
		<fieldset name='document-type'>
			<h6>DocumentType</h6>
			{/* <SelectInput options={types} property='name' defaultLanguage='en' /> */}
			<SelectInput
				options={names}
				value='id'
				defaultLanguage='en'
				onChange={onChange}
			/>
		</fieldset>
	);
};

export default DocumentType;
