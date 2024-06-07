'use client';

// state/actions
import { REMOVE_FROM_COLLECTION } from '@/state/actionTypes';
import {
	useSettingsContext,
	useSettingsDispatchContext,
} from '@/state/settingsContext';
import { deleteCollections } from '@/serverActions/settings/deleteCollections';
import { generateUUID } from '@/utils/generateUUID';

// components
// import LanguageInputContainer from '../inputs/LanguageInputContainer';
// import ContextButton from '../buttons/ContextButton';
import CollectionItem from './CollectionItem';

// import CollectionItems from './CollectionItems';

const FormCollections = ({ languages, defaultLanguage, setting }) => {
	const dispatch = useSettingsDispatchContext();
	//   const state = useSettingsContext();
	// const { collections } = useSettingsContext();
	const { collections = [] } = setting;

	//   const [collectionItems, setCollectionItems] = useState();
	// const collRef = useRef(collections);

	// console.log(collRef);

	// const [shouldRender, setShouldRender] = useState(false);

	//   useEffect(() => {
	//     setCollectionItems(...collections);
	//   }, [collections]);
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
	const handleRemove = async (index) => {
		console.log(index, 'the INDEX');
		await deleteCollections(index, setting);
	};
	// const handleRemove = (collection) => {
	// 	dispatch({
	// 		type: REMOVE_FROM_COLLECTION,
	// 		payload: {
	// 			state: 'collections',
	// 			type: 'remove',
	// 			value: collection,
	// 		},
	// 	});
	// };

	//   console.log(collectionItems, 'ovaj');
	//   console.log(collections, 'ovaj');
	return (
		<div className='flex flex-col items-start gap-1'>
			{collections.map((collection) => {
				let uuid = generateUUID();

				return (
					<CollectionItem
						key={uuid}
						languages={languages}
						inputs={collection}
						defaultLanguage={defaultLanguage}
						onClick={() => handleRemove(collection)}
					/>
				);
			})}
		</div>
	);
};

export default FormCollections;
