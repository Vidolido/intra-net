'use client';
// state/actions
import { generateUUID } from '@/utils/generateUUID';

// components
import ContextButton from '@/components/buttons/ContextButton';
import LanguageInput from '@/components/reusable/LanguageInput';

const Collections = ({ languages, setState, collections }) => {
	const handleCollectionData = (data, dataObj) => {
		let newCollections = [...collections];
		newCollections.find((coll) => coll.id === dataObj?.id).name = data;
		setState((prev) => ({
			...prev,
			collections: newCollections,
		}));
	};
	const handleDelete = (e) => {
		let filtered = collections.filter(
			(collection) => JSON.stringify(collection) !== JSON.stringify(e)
		);
		setState((prev) => ({
			...prev,
			collections: filtered,
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
								id: collection?._id || collection.id,
								state: collection?.name,
							}}
							extractData={handleCollectionData}
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
