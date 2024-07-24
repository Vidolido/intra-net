import ContextButton from '@/components/buttons/ContextButton';
import LanguageInputContainer from '@/components/inputs/LanguageInputContainer';

const Collections = ({ collections, setCollections, languages }) => {
  console.log(collections, 'collections in Collections');
  const handleSave = (e) => {};
  const handleDelete = (e) => {
    let filtered = collections.filter(
      (collection) => JSON.stringify(collection) !== JSON.stringify(e)
    );
    setCollections(filtered);
  };
  return (
    <fieldset name='option-schema-collections' className='flex flex-col gap-1'>
      <h5>Collections</h5>
      {collections &&
        collections.map((collection) => {
          return (
            <div key={collection._id} className='flex gap-2'>
              <LanguageInputContainer
                languages={languages}
                inputs={collection.name}
                value='name'
                defaultLanguage={languages[0]}
              />
              <ContextButton
                label='Remove'
                type='edit'
                onClick={() => handleDelete(collection)}
              />
            </div>
          );
        })}
    </fieldset>
  );
};

export default Collections;
