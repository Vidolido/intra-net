'use client';

// state/actions
import {
	useSettingsContext,
	useSettingsDispatchContext,
} from '@/state/settingsContext';

// components
import LanguageInputContainer from '../inputs/LanguageInputContainer';
import ContextButton from '../buttons/ContextButton';
import {
	Fragment,
	memo,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { REMOVE, REMOVE_FROM_COLLECTION } from '@/state/actionTypes';
import CollectionItem from './CollectionItem';
import { deleteCollections } from '@/serverActions/settings/deleteCollections';
import CollectionItems from './CollectionItems';

const FormCollections = ({ languages, defaultLanguage, setting }) => {
	const dispatch = useSettingsDispatchContext();
	const state = useSettingsContext();
	const { collections } = useSettingsContext();
	// const { collections = [] } = setting;

	const [collectionItems, setCollectionItems] = useState(collections);
	// const collRef = useRef(collections);

	// console.log(collRef);

	// const [shouldRender, setShouldRender] = useState(false);

	useEffect(() => {
		setCollectionItems(collections);
	}, [collections]);
	// useEffect(() => {
	// 	if (collRef.current.length !== collections.length)
	// 		console.log('kujznae sho mu e');
	// }, [collections.length]);

	// const handleRemove = useCallback(
	// 	async (index) => {
	// 		console.log(index, 'the INDEX');
	// 		await deleteCollections(index, setting);
	// 	},
	// 	[setting]
	// );

	const handleRemove = useCallback(
		(collection) => {
			dispatch({
				type: REMOVE_FROM_COLLECTION,
				payload: {
					state: 'collections',
					type: 'remove',
					value: collection,
				},
			});
			// setShouldRender(true);
		},
		[dispatch]
	);

	console.log(state);
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
			{/* {collections.map((collection, index) => (
				<CollectionItem
					key={index}
					languages={languages}
					inputs={collection}
					defaultLanguage={defaultLanguage}
					onClick={() => handleRemove(index)}
				/>
			))} */}
			<CollectionItems>
				{collectionItems.map((collection, index) => (
					<div key={index}>
						<LanguageInputContainer
							languages={languages}
							inputs={collection}
							defaultLanguage={defaultLanguage}
						/>
						<ContextButton
							label='Remove'
							onClick={() => handleRemove(collection)}
						/>
					</div>
				))}
			</CollectionItems>
		</div>
	);
};

export default FormCollections;
// export default memo(FormCollections, (prev, next) => {
// 	console.log('prev', prev);
// 	console.log('next', next);

// 	return true;
// });
