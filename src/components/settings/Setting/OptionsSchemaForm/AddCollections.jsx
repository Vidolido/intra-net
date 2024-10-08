import { useState } from 'react';

// state/actions
import { generateUUID } from '@/utils/generateUUID';

// components
import ContextButton from '@/components/buttons/ContextButton';
import LanguageInputContainer from '@/components/inputs/LanguageInputContainer';

const AddCollections = ({ collectionsLength, languages, setCollections }) => {
  const [error, setError] = useState(null);

  const handleAdd = (e) => {
    let collectionInputs = e.target.form.elements
      .namedItem('options-schema-add')
      .querySelectorAll('input');

    let collectData = Array.from(collectionInputs).reduce(
      (acc, currentItem) => {
        acc[`collection[${collectionsLength}]-${currentItem.name}`] =
          currentItem.value || '';
        return acc;
      },
      {}
    );

    let areAllFieldsEmpty = Array.from(collectionInputs).find(
      (input) => input.value.length > 0
    );

    if (areAllFieldsEmpty == undefined) {
      setError('Please fill all fields');
    } else {
      let payload = {
        _id: generateUUID(),
        name: collectData,
      };
      setError(null);
      setCollections((prev) => [...prev, payload]);
      collectionInputs.forEach((input) => (input.value = ''));
    }
  };
  return (
    <>
      <fieldset name='options-schema-add' className='flex items-end gap-2'>
        <LanguageInputContainer
          fieldSetName='collection-input'
          label='Collection'
          languages={languages}
          defaultLanguage={languages[0]}
        />
        <ContextButton label='Add' type='edit' onClick={handleAdd} />
      </fieldset>
      <p>{error}</p>
    </>
  );
};

export default AddCollections;
