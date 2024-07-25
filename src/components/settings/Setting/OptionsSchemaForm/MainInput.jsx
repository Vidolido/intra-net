import LanguageInputContainer from '@/components/inputs/LanguageInputContainer';

const MainInput = ({ setting, languages }) => {
  const singular = setting?.optionsSchema?.parameter?.name?.singular;
  const plural = setting?.optionsSchema?.parameter?.name?.plural;

  return (
    <fieldset
      name='option-schema-main'
      className='border border-slate-300 rounded p-1'>
      <h5>Main parameter</h5>
      <div className='flex gap-2'>
        <LanguageInputContainer
          fieldSetName='singular'
          label='Singular'
          name={'singular-'}
          languages={languages}
          defaultLanguage={languages[0]}
          inputs={singular}
        />
        <LanguageInputContainer
          fieldSetName='plural'
          label='Plural'
          name={'plural-'}
          languages={languages}
          defaultLanguage={languages[0]}
          inputs={plural}
        />
      </div>
    </fieldset>
  );
};

export default MainInput;
