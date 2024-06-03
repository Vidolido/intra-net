'use client';

// state/actions
import {
  useSettingsContext,
  useSettingsDispatchContext,
} from '@/state/settingsContext';
import { useErrorContext } from '@/state/ErrorContext';
import { addCollections } from '@/serverActions/settings/addCollections';

// components
import LanguageInputContainer from '../inputs/LanguageInputContainer';
import ContextButton from '../buttons/ContextButton';
// import { ADD } from '@/state/actionTypes';
// import ActionButton from '../buttons/ActionButton';

const AddCollections = ({ languages, defaultLanguage, setting }) => {
  const state = useSettingsContext();
  const dispatch = useSettingsDispatchContext();
  const { error, setError } = useErrorContext();
  //   const error = useErrorContext();

  console.log(error, 'THE ERROR?');
  console.log(setting, 'THE SETTING');

  const handleClick = async (e) => {
    // const length = state.collections.length; // take the length before population
    const length = !setting.collections ? 0 : setting.collections.length;

    console.log(setting, 'THE SETTING AFTER CLICK');

    const collectionElements = Array.from(e.target.form.elements).filter(
      (element) => element.name.includes('collection')
    );

    const collectionNames = collectionElements?.map((element) => {
      let nameArray = element.name.split('-').splice(1);
      return {
        [length + '-' + nameArray.join('-')]: element.value,
      };
    });
    let test = JSON.parse(await addCollections(collectionNames, setting));
    console.log(test, 'THE TEST');
    // dispatch({
    //   type: ADD,
    //   payload: { state: 'collections', value: collectionNames, type: 'push' },
    // });
  };
  //   console.log(state, 'THE STATEeee');
  return (
    <div className='flex items-end gap-2'>
      <LanguageInputContainer
        label='Collection'
        languages={languages}
        name='collection'
        defaultLanguage={defaultLanguage}
      />
      <ContextButton label='Add' onClick={handleClick} />
      {/* <ActionButton label='Add' setError={setError} /> */}
    </div>
  );
};

export default AddCollections;
