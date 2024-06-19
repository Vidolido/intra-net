import SelectInput from '@/components/inputs/SelectInput';
import { findSettingType } from '@/utils/findSettingType';
import { nameArray } from '@/utils/nameArray';

const SampleType = ({ types, onChange, defaultValue, classes, name }) => {
  let sampleTypes = findSettingType(types.settings, ['sample']);
  let names = sampleTypes?.map((setting) => ({
    id: setting._id,
    ...nameArray(setting.parameter.inputValue),
  }));

  // console.log(names);

  return (
    <fieldset name='sample-types'>
      <h6>Sample Type</h6>

      <SelectInput
        name={name}
        options={names}
        value='id'
        none={true}
        onChange={onChange}
        defaultLanguage='en'
        defaultValue={defaultValue}
        classes={classes}
      />
    </fieldset>
  );
};

export default SampleType;
