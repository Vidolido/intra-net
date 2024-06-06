'use client';

// state/context
import { useSettingsContext } from '@/state/settingsContext';

// utils
import { generateUUID } from '@/utils/generateUUID';

const DisplayCollections = ({ languages, defaultLanguage }) => {
	// const { state } =
	const { selectedCollection, optionSchema } = useSettingsContext();
	const { collections } = optionSchema;
	// console.log(
	// 	collections && collections[selectedCollection].collection,
	// 	selectedCollection,
	// 	'THE collections'
	// );
	// const uuid = generateUUID();
	// console.log(uuid);
	return (
		<fieldset name='collection-items'>
			<ul className='pl-5 flex flex-col gap-1'>
				{collections &&
					collections[selectedCollection].collection.map((item) => {
						{
							/* collections[selectedCollection].collection.map((item, index) => { */
						}
						const uuid = generateUUID();
						return (
							<li className='list-disc' key={uuid}>
								{/* <li className='list-disc' key={index}> */}
								<span className='border-l border-slate-300 pl-2'>
									{(typeof item.value === 'string' && item.value) ||
										item.value[defaultLanguage.language] ||
										`${item?.value?.key} - ${item?.value?.value}`}
								</span>
							</li>
						);
					})}
			</ul>
		</fieldset>
	);
};

export default DisplayCollections;
