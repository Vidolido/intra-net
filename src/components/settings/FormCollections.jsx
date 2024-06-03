'use client';

// state/actions
import {
  useSettingsContext,
  useSettingsDispatchContext,
} from '@/state/settingsContext';

// components
import LanguageInputContainer from '../inputs/LanguageInputContainer';
import ContextButton from '../buttons/ContextButton';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { REMOVE, REMOVE_FROM_COLLECTION } from '@/state/actionTypes';
import CollectionItem from './CollectionItem';

const FormCollections = ({ languages, defaultLanguage }) => {
  const dispatch = useSettingsDispatchContext();
  const { collections } = useSettingsContext();

  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) {
      setShouldRender(false);
    }
  }, [shouldRender]);

  const handleRemove = useCallback(
    (index) => {
      dispatch({
        type: REMOVE_FROM_COLLECTION,
        payload: {
          state: 'collections',
          type: 'remove',
          value: {
            index,
          },
        },
      });
      setShouldRender(true);
    },
    [dispatch, shouldRender]
  );
  // dispatch({
  //   type: ADD_TO_COLLECTION,
  //   payload: {
  //     state: 'optionSchema',
  //     type: 'add',

  //     value: {
  //       parameter: { ...state.optionSchema.parameter },
  //       collections: [...collections],
  //     },
  //   },
  // });

  //   const tet = useCallback(() => {}, []);

  return (
    <div className='flex flex-col items-start gap-1'>
      {/* {collections.map((collection, index) => (
        <Fragment key={index}>
          <LanguageInputContainer
            languages={languages}
            inputs={collection}
            defaultLanguage={defaultLanguage}
          />
          <ContextButton label='Remove' onClick={() => handleRemove(index)} />
        </Fragment>
      ))} */}
      {collections.map((collection, index) => (
        <CollectionItem
          key={index}
          languages={languages}
          inputs={collection}
          defaultLanguage={defaultLanguage}
          onClick={() => handleRemove(index)}
        />
      ))}
    </div>
  );
};

export default FormCollections;
