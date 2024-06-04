'use client';

import { useSettingsContext } from '@/state/settingsContext';

const DisplayCollections = ({ languages }) => {
  // const { state } =
  const { selectedCollection, optionSchema } = useSettingsContext();
  const { collections } = optionSchema;
  // console.log(
  // 	collections && collections[selectedCollection].collection,
  // 	selectedCollection,
  // 	'THE collections'
  // );
  return (
    <div>
      DisplayCollections
      {collections &&
        collections[selectedCollection].collection.map((item, index) => {
          return (
            <p key={index}>
              {(typeof item.value === 'string' && item.value) ||
                item.value['en'] ||
                `${item?.value?.key} - ${item?.value?.value}`}
            </p>
          );
        })}
    </div>
  );
};

export default DisplayCollections;
