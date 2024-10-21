'use client';
import { useCallback } from 'react';

// state/actions
import { generateUUID } from '@/utils/generateUUID';

// components
import ContextButton from '@/components/buttons/ContextButton';
import LanguageInput from '@/components/reusable/LanguageInput';
import { deepEqual } from '@/utils/helpers/deepEqual';

const Collections = ({
	languages,
	setState,
	collections,
	resetLanguage,
	setResetLanguage,
	resetType,
}) => {
	const handleCollectionData = (data, dataObj) => {
		// console.log(collections, 'old');
		let newCollections = [...collections];
		newCollections = newCollections.find(
			(coll) => coll.id === dataObj?.id
		).name = data;
		// console.log(newCollections, 'NEW COLL');
		// setState((prev) => ({ ...prev, collections: newCollections }));
		// console.log(newCollections, 'NEW');
		// const collectionMap = new Map(
		//   collections.map((item) => [dataObj.id, data])
		// );
		// console.log(collectionMap, 'coll map');
		// console.log(
		//   collections.find((item) => item.id === dataObj.id),
		//   'collections from state'
		// );
		// setState((prev) => ({
		//   ...prev,
		//   collections: [
		//     ...prev.collections,
		//     ...(prev.collections.find((item) => item.id === dataObj.id).name =
		//       data),
		//   ],
		// }));
		// console.log(data, dataObj, 'THIS RAN');
		// let newCollections = [...collections];
		// console.log(newCollections, 'new COLL');
		// newCollections.find((coll) => coll.id === dataObj?.id).name = data;
		// setState((prev) => ({
		//   ...prev,
		//   collections: newCollections,
		// }));
		// setResetLanguage((prev) => ({
		//   ...prev,
		//   [resetType]: true,
		// }));
	};

	const handleDelete = (e) => {
		let filtered = collections.filter(
			(collection) => JSON.stringify(collection) !== JSON.stringify(e)
		);
		setState((prev) => ({
			...prev,
			collections: filtered,
		}));
		setResetLanguage((prev) => ({
			...prev,
			[resetType]: true,
		}));
	};
	return (
		<fieldset name='option-schema-collections' className='flex flex-col gap-1'>
			<h5>Collections</h5>
			{collections &&
				collections.map((collection) => (
					<div key={collection?._id || generateUUID()} className='flex gap-2'>
						<LanguageInput
							languages={languages}
							data={{
								defaultLanguage: languages[0].language,
								id: collection?._id || collection.id,
								state: collection?.name,
							}}
							extractData={handleCollectionData}
							//   extractData={null}
							resetLanguage={resetLanguage}
							setResetLanguage={setResetLanguage}
							resetType={resetType}
						/>
						<ContextButton
							label='Remove'
							type='edit'
							onClick={() => handleDelete(collection)}
						/>
					</div>
				))}
		</fieldset>
	);
};

export default Collections;
