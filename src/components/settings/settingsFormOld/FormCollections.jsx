'use client';

// state/actions
import { deleteCollections } from '@/serverActions/settings/deleteCollections';
import { generateUUID } from '@/utils/generateUUID';

// components
import CollectionItem from './CollectionItem';

const FormCollections = ({ languages, defaultLanguage, setting }) => {
	const { collections = [], optionsSchema = [] } = setting;

	const handleRemove = async (index) => {
		await deleteCollections(index, setting);
	};
	// console.log(optionsSchema?.collections, 'the optionsSchema');
	return (
		<div className='flex flex-col items-start gap-1'>
			{/* {collections?.map((collection) => {
				return (
					<CollectionItem
						key={generateUUID()}
						languages={languages}
						inputs={collection}
						defaultLanguage={defaultLanguage}
						onClick={() => handleRemove(collection)}
					/>
				);
			})} */}
			{optionsSchema?.collections != null
				? optionsSchema?.collections?.map((collection) => {
						return (
							<CollectionItem
								key={collection._id}
								languages={languages}
								inputs={collection}
								defaultLanguage={defaultLanguage}
								onClick={() => handleRemove(collection)}
							/>
						);
				  })
				: ''}
		</div>
	);
};

export default FormCollections;
