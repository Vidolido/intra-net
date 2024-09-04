'use client';

// state/context
import { useSettingsContext } from '@/state/settingsContext';

// components
import SingleItem from './SingleItem';

const DisplayCollections = ({ languages }) => {
	const { selectedCollection, optionsSchema } = useSettingsContext();
	const { collections } = optionsSchema;

	return (
		<fieldset name='collection-items'>
			<ul className='pl-5 flex flex-col gap-1'>
				{collections &&
					collections[selectedCollection]?.items?.map((item) => (
						<SingleItem key={item.id} item={item} languages={languages} />
					))}
			</ul>
		</fieldset>
	);
};

export default DisplayCollections;
