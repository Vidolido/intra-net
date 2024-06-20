'use client';

// state/actions
import { deleteCollections } from '@/serverActions/settings/deleteCollections';
import { generateUUID } from '@/utils/generateUUID';

// components
import CollectionItem from './CollectionItem';

const FormCollections = ({ languages, defaultLanguage, setting }) => {
	const { collections = [] } = setting;

	const handleRemove = async (index) => {
		await deleteCollections(index, setting);
	};
	return (
		<div className='flex flex-col items-start gap-1'>
			{collections?.map((collection) => {
				return (
					<CollectionItem
						key={generateUUID()}
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
