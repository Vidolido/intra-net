import SelectInput from '@/components/inputs/SelectInput';
import RadioButtons from '../RadioButtonsOld';
import { nameArray } from '@/utils/nameArray';
// import { createLanguageInputs } from '@/utils/createLanguageInputs';

const EditCollections = ({ collections }) => {
  console.log(collections, 'collections');
  // let names = createLanguageInputs(collections);
  // let labels = collections?.map((collection) => ({
  // 	id: collection._id,
  // 	...nameArray(collection.name),
  // }));

  // let names = documentTypes?.map((setting) => ({
  // 	id: setting._id,
  // 	...nameArray(setting.parameter.inputValue),
  // }));
  // console.log(labels, 'labels');
  return (
    <div>
      <fieldset className='flex flex-col min-w-[200px]'>
        <label>Collection</label>

        <SelectInput
          name='collection-select'
          options={collections}
          defaultLanguage='en'
        />
        {/* <RadioButtons labels={labels} /> */}
        <RadioButtons
          divClasses='flex gap-1 w-full'
          labelClasses={`flex flex-col items-center border border-slate-200 rounded hover:bg-red-500 hover:text-white cursor-pointer px-3 py-[2px]`}
          inputClasses='hidden'
          labels={['Simple', 'Translations', 'key/value']}
          name='inputType'
          // inputType={inputType}
          // onChange={handleRadioChange}
        />
      </fieldset>
    </div>
  );
};

export default EditCollections;
