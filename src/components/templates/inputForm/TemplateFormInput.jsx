'use client';
import { useState } from 'react';

// state/asctions
import { generateUUID } from '@/utils/generateUUID';

// components
import SelectInput from '../../inputs/SelectInput';
import { addTemplateSetting } from '@/serverActions/laboratoryTemplates/addTemplateSetting';

const TemplateFormInput = ({ document, settings, defaultLanguage }) => {
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

		if (isChecked && !selectedItems[collectionId]) {
			setSelectedItems((prevState) => ({
				...prevState,
				[collectionId]: [e.target.value],
			}));
		}

		if (isChecked && selectedItems[collectionId]) {
			setSelectedItems((prevState) => ({
				...prevState,
				[collectionId]: [...prevState[collectionId], e.target.value],
			}));
		}

		if (!isChecked) {
			let removeUnChecked = selectedItems[collectionId].filter(
				(item) => Number(item) !== Number(e.target.value)
			);
			setSelectedItems((prevState) => ({
				...prevState,
				[collectionId]: removeUnChecked,
			}));
		}
	};

	let handleAdd = async (e) => {
		let property = {
			_id: selection._id,
			propertyValue: selection.parameter.inputValue,
		};

		let collections = selection.collections;

		let mutCollections = collections.reduce((acc, currentValue) => {
			if (currentValue._id in selectedItems) {
				let itemsToFind = selectedItems[currentValue._id].map(
					(item) => currentValue.items[item]
				);
				acc[currentValue._id] = [...itemsToFind];
			}
			return acc;
		}, {});

		// console.log(property, 'property');
		// console.log(mutCollections, 'mut');
		await addTemplateSetting({ property, mutCollections, document });
	};

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
				<button type='button' onClick={handleAdd}>
					Add
				</button>
			</div>
		</div>
	);
};

export default TemplateFormInput;
