'use client';

import { useSettingsContext } from '@/state/settingsContext';

const DisplayCollections = ({ languages }) => {
	const { state } = useSettingsContext();
	const { selectedCollection } = state;
	const { collections } = state?.optionSchema;
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
					return <p key={index}>{item.value['en'] || item.value}</p>;
				})}
		</div>
	);
};

export default DisplayCollections;
