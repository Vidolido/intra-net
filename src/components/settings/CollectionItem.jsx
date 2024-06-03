import ContextButton from '../buttons/ContextButton';
import LanguageInputContainer from '../inputs/LanguageInputContainer';

const CollectionItem = ({ languages, inputs, defaultLanguage, onClick }) => {
  return (
    <>
      <LanguageInputContainer
        languages={languages}
        inputs={inputs}
        defaultLanguage={defaultLanguage}
      />
      <ContextButton label='Remove' onClick={onClick} />
    </>
  );
};

export default CollectionItem;
