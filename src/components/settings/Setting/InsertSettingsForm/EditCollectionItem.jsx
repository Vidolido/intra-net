import InputType from '@/components/inputs/InputType';
import LanguageInputContainer from '@/components/inputs/LanguageInputContainer';

let types = (languages, value, onChange) => ({
  simple: (
    <InputType type='text' name='simple' value={value} onChange={onChange} />
  ),
  translations: (
    <LanguageInputContainer
      languages={languages}
      defaultLanguage={languages[0]}
      inputs={value}
      onChange={onChange}
    />
  ),
  'key/value': (
    <>
      <InputType type='text' name='key' value={value.key} onChange={onChange} />
      <InputType
        type='text'
        name='value'
        value={value.value}
        onChange={onChange}
      />
    </>
  ),
});

const EditCollectionItem = ({
  languages,
  state,
  setState,
  selectedCollection,
  item,
}) => {
  const handleChange = (e) => {
    let collections = [...state.collections] || [];
    // console.log(collections, 'THE COLLECTIONS');
    // let collection = collections.find(
    //   (collection) =>
    //     collection.collectionId === selectedCollection &&
    //     collection._id === selectedCollection
    // );
    let collection = collections.find(
      (collection) => collection._id === selectedCollection
    );
    collection.items = collection.items.map((cItem) => {
      if (cItem.id === item.id && cItem._id === item._id) {
        let value;
        if (item.inputType === 'simple') {
          value = e.target.value;
        }
        if (item.inputType === 'translations') {
          value = { ...value, [e.target.name]: e.target.value };
        }
        if (item.inputType === 'key/value') {
          value = { ...value, [e.target.name]: e.target.value };
        }
        cItem.value = value;

        // return cItem;
      }
      return cItem;
    });
    setState({ ...state, collections });
  };
  return (
    <div> {types(languages, item.value, handleChange)[item.inputType]} </div>
  );
};

export default EditCollectionItem;
