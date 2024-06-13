'use client';

// state/context
import { REMOVE_FROM_COLLECTION } from '@/state/actionTypes';
import {
	useSettingsContext,
	useSettingsDispatchContext,
} from '@/state/settingsContext';

// utils
import { generateUUID } from '@/utils/generateUUID';

// components
import ContextButton from '@/components/buttons/ContextButton';

const DisplayCollections = ({ languages, defaultLanguage }) => {
	const dispatch = useSettingsDispatchContext();
	const { selectedCollection, optionsSchema } = useSettingsContext();
	const { collections } = optionsSchema;

	const handleDelete = (item) => {
		dispatch({
			type: REMOVE_FROM_COLLECTION,
			payload: {
				state: 'optionsSchema',
				value: item,
				more: {
					property: 'collections',
				},
			},
		});
	};

	return (
		<fieldset name='collection-items'>
			<ul className='pl-5 flex flex-col gap-1'>
				{collections &&
					collections[selectedCollection]?.items?.map((item) => {
						return (
							<li
								className='list-disc border border-slate-50 hover:border-red-200 focus:outline-none'
								key={item.id}>
								<div className='flex justify-between gap-2'>
									<span className='block border-l border-slate-300 px-2'>
										{(typeof item.value === 'string' && item.value) ||
											item.value[defaultLanguage.language] ||
											`${item?.value?.key} - ${item?.value?.value}`}
									</span>
									<ContextButton
										label='delete'
										type='default'
										onClick={() => handleDelete(item.id)}
										classes='border-l border-slate-300 px-2'
									/>
								</div>
							</li>
						);
					})}
			</ul>
		</fieldset>
	);
};

export default DisplayCollections;
