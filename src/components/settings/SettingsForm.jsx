// state/actions
import { getLanguages } from '@/app/dashboard/apiCalls';
import { createSetting } from '@/serverActions/settings';

// components
import SelectInput from '../inputs/SelectInput';
import InputType from '../inputs/InputType';
import LanguageInputContainer from '../inputs/LanguageInputContainer';
import FormCollections from './FormCollections';
import SubmitButton from '../buttons/SubmitButtons';
import AddCollections from './AddCollections';
import SaveOptionSchema from './SaveOptionSchema';

const sectors = [
  { name: 'Laboratory' },
  { name: 'Oil Movement' },
  { name: 'Administration' },
];

const SettingsForm = async () => {
  const { languages } = await getLanguages();
  const defaultLanguage = await languages.filter(
    (lang) => lang.language === 'en'
  )[0];
  console.log(defaultLanguage, 'THE DEF LANG');
  return (
    <form action={createSetting}>
      <h3>Settings Form</h3>
      <fieldset>
        <label>
          Sector
          <SelectInput
            name='sector'
            options={sectors}
            label='name'
            value='name'
          />
        </label>
        <label>
          Setting Name
          <InputType type='text' name='settingName' />
        </label>
      </fieldset>
      <div>
        <fieldset name='option-schema-main'>
          <h4>Option schema</h4>
          <h5>Main parameter</h5>
          <LanguageInputContainer
            languages={languages}
            label={'Singular'}
            name={'main-singular'}
            defaultLanguage={defaultLanguage}
          />
          <LanguageInputContainer
            languages={languages}
            label={'Plural'}
            name={'main-plural'}
            defaultLanguage={defaultLanguage}
          />
        </fieldset>
        <fieldset name='option-schema-add'>
          <h5>Add Collections</h5>
          <AddCollections
            languages={languages}
            defaultLanguage={defaultLanguage}
          />
        </fieldset>
        <fieldset name='option-schema-options'>
          <h5>Collections</h5>
          <FormCollections
            languages={languages}
            defaultLanguage={defaultLanguage}
          />
        </fieldset>
        <SaveOptionSchema />
      </div>
      <SubmitButton label={'Create'} />
    </form>
  );
};

export default SettingsForm;
