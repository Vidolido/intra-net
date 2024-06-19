import SelectInput from '@/components/inputs/SelectInput';
import { documentTypes } from './documentTypes';
import { findSettingType } from '@/utils/findSettingType';
import { nameArray } from '@/utils/nameArray';

const DocumentType = ({ types, onChange, defaultValue, classes, name }) => {
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
      <SelectInput
        name={name}
        options={names}
        value='id'
        defaultLanguage='en'
        defaultValue={defaultValue}
        onChange={onChange}
        classes={classes}
      />
    </fieldset>
  );
};

export default DocumentType;
