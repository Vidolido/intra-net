'use client';

// state/actions
// import { REMOVE_FROM_COLLECTION } from '@/state/actionTypes';
// import {
// 	useSettingsContext,
// 	useSettingsDispatchContext,
// } from '@/state/settingsContext';
import { deleteCollections } from '@/serverActions/settings/deleteCollections';
import { generateUUID } from '@/utils/generateUUID';

// components
import CollectionItem from './CollectionItem';

const FormCollections = ({ languages, defaultLanguage, setting }) => {
	// const dispatch = useSettingsDispatchContext();
	const { collections = [] } = setting;

	const handleRemove = async (index) => {
		// console.log(index, 'the INDEX');
		await deleteCollections(index, setting);
	};
	return (
		<div className='flex flex-col items-start gap-1'>
			{collections?.map((collection) => {
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
