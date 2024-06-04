import ContextButton from '../buttons/ContextButton';
import LanguageInputContainer from '../inputs/LanguageInputContainer';

const CollectionItem = ({ languages, inputs, defaultLanguage, onClick }) => {
  return (
    <div className='flex gap-2'>
      <LanguageInputContainer
        languages={languages}
        inputs={inputs}
        defaultLanguage={defaultLanguage}
      />
      <ContextButton label='Remove' onClick={onClick} />
    </div>
  );
};

export default CollectionItem;
