'use client';
import { useState } from 'react';

// state/asctions
import { generateUUID } from '@/utils/generateUUID';

// components
import SelectInput from '../../inputs/SelectInput';

const TemplateFormInput = ({ settings, defaultLanguage }) => {
	const [selection, setSelection] = useState(settings[0]);
	const [selectedItems, setSelectedItems] = useState({});

	let properties = settings.map((setting) => ({
		_id: setting._id,
		name: { ...setting.parameter.inputValue },
	}));

	const handleChange = (e) => {
		let selected = settings.filter((setting) => setting._id === e.target.value);
		setSelection(...selected);
		setSelectedItems({});
	};

	const handleCheck = (e) => {
		let isChecked = e.target.checked;
		let collectionId = e.target.name;

		// console.log(isChecked, collectionId);
		setSelectedItems((prevState) => {
			let coll = prevState[collectionId] || [];
			if (isChecked) {
				coll.push(e.target.value);
			} else {
				coll = coll.filter((item) => Number(item) !== Number(e.target.value));
			}
			return { ...prevState, [collectionId]: coll };
		});
	};
	// console.log(selectedItems, 'the selectedItems');
	return (
		<div className='grid grid-cols-7 gap-4'>
			<div className='w-full'>
				<SelectInput
					options={properties}
					value='_id'
					defaultLanguage={defaultLanguage.language}
					classes='w-full'
					onChange={handleChange}
				/>
			</div>
			{selection?.collections?.map((collection) => {
				let items = collection.items;
				return (
					<div className='w-full' key={collection._id}>
						{items.map((item, index) => {
							let check =
								selectedItems[collection._id] &&
								selectedItems[collection._id].includes(index.toString());
							return (
								<label key={generateUUID()} className='flex gap-1'>
									<input
										type='checkbox'
										name={collection._id}
										value={index}
										onChange={handleCheck}
										checked={check && check}
									/>
									<span>
										{(typeof item.value === 'string' && item.value) ||
											item.value[defaultLanguage.language] ||
											`${item?.value?.key} - ${item?.value?.value}`}
									</span>
								</label>
							);
						})}
					</div>
				);
			})}
			<div>result</div>
			<div>me</div>
			<div>
				<button type='button'>Add</button>
			</div>
		</div>
	);
};

export default TemplateFormInput;