import SelectInput from '@/components/inputs/SelectInput';
import { sampleTypes } from './sampleTypes';

const SampleType = () => {
  const analysesTypes = sampleTypes;
  return (
    <fieldset name='sample-types'>
      <h6>Sample Type</h6>
      {/* <SelectInput
        options={analysesTypes}
        property='name'
        defaultLanguage='en'
        none={true}
      /> */}
      <SelectInput
        options={analysesTypes}
        type='id'
        defaultLanguage='en'
        none={true}
      />
    </fieldset>
  );
};

export default SampleType;
