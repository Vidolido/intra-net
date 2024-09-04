'use client';

// components
import SingleCollectionItem from './SingleCollectionItem';

const DisplayCollections = ({
  languages,
  state,
  setState,
  selectedCollection,
}) => {
  let collectionItems = state?.collections?.find(
    (coll) => coll._id === selectedCollection
  );
  return (
    <fieldset name='collection-items'>
      <ul className='pl-5 flex flex-col gap-1'>
        {collectionItems &&
          collectionItems?.items?.map((item) => (
            <SingleCollectionItem
              key={item.id}
              languages={languages}
              state={state}
              setState={setState}
              selectedCollection={selectedCollection}
              item={item}
            />
          ))}
      </ul>
    </fieldset>
  );
};

export default DisplayCollections;
