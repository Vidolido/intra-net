'use client';
import { useState } from 'react';

// state/asctions
import { addTemplateSetting } from '@/serverActions/laboratoryTemplates/addTemplateSetting';
import { generateUUID } from '@/utils/generateUUID';
import { mutateForSelect } from '@/utils/helpers/mutateForSelect';
import { isObjectEmpty } from '@/utils/functions';
import { formatKeyValue } from '@/utils/settings/formatKeyValue';

// components
import GroupParam from './GroupParam';
import ContextButton from '@/components/buttons/ContextButton';
import SelectInput from '@/components/reusable/SelectInput';
import NormalInput from '@/components/reusable/NormalInput';

const Form = ({ languages, document, setting, groups, defaultLanguage }) => {
	const { optionsSchema, settings } = setting;
	const [selectedProperty, setSelectedProperty] = useState(settings[0]);

	const [selectedOptions, setSelectedOptions] = useState({});

	const [additional, setAdditional] = useState({
		result: selectedProperty.result || '',
		marginError: selectedProperty.marginError || '',
	});

	const [group, setGroup] = useState({});

	let properties = mutateForSelect(settings);

	const handleChange = (data, dataObj) => {
		let selected = settings.find((setting) => setting._id === data);
		setSelectedProperty(selected);
		setSelectedOptions({});
		setAdditional({
			result: '',
			marginError: '',
		});
	};

	const handleCheck = (e) => {
		let { checked, name: collectionId, value } = e.target;

		if (checked && !selectedOptions[collectionId]) {
			setSelectedOptions((prevState) => ({
				...prevState,
				[collectionId]: [value],
			}));
		}

		if (checked && selectedOptions[collectionId]) {
			setSelectedOptions((prevState) => ({
				...prevState,
				[collectionId]: [...prevState[collectionId], value],
			}));
		}

		if (!checked) {
			let removeUnChecked = selectedOptions[collectionId].filter(
				(item) => item._id === value
			);
			setSelectedOptions((prevState) => ({
				...prevState,
				[collectionId]: removeUnChecked,
			}));
		}
	};

	const handleAdditionalInput = (data, dataObj) => {
		setAdditional({
			...additional,
			[dataObj.name]: data,
		});
	};

	let handleAdd = async (e) => {
		let property = {
			_id: selectedProperty?._id,
			name: selectedProperty?.parameter,
		};
		let mutCollections = Object.entries(selectedProperty?.collections).reduce(
			(acc, [_id, options]) => {
				if (_id in selectedOptions) {
					let itemsToFind = selectedOptions[_id].map((slectedOptionId) => {
						const option = options.find((opt) => opt._id === slectedOptionId);
						return { _id: option._id, value: option.value };
					});
					acc[_id] = itemsToFind;
				} else acc[_id] = [];
				return acc;
			},
			{}
		);

		// // Тука чекам грешка
		await addTemplateSetting({
			property,
			mutCollections,
			additional,
			group: !isObjectEmpty(group) && group,
			document,
		});
	};

	return (
		<form className='grid grid-cols-7 gap-4 border rounded bg-white h-[130px]'>
			<div className='flex flex-col justify-between gap-2 w-full p-1'>
				<SelectInput
					defaultLanguage={languages[0].language}
					data={{
						state: properties,
						// defaultValue: selectedCollection,
						classes: 'flex flex-col items-start bg-white px-[2px] w-full',
					}}
					extractData={handleChange}
				/>

				<GroupParam languages={languages} setGroup={setGroup} groups={groups} />
			</div>
			{Object.entries(selectedProperty?.collections)?.map(
				([_id, collection]) => {
					return (
						<fieldset
							key={_id || generateUUID()}
							className='w-full border-l px-1 overflow-y-scroll'>
							{collection.map((item) => {
								let check =
									selectedOptions[_id] &&
									selectedOptions[_id].includes(item._id.toString());
								return (
									<label
										key={generateUUID()}
										className='flex gap-1 hover:text-red-600 hover:font-semibold cursor-pointer'>
										<input
											type='checkbox'
											name={_id}
											value={item._id}
											onChange={handleCheck}
											checked={check && check}
										/>
										<span>
											{(typeof item.value === 'string' && item.value) ||
												item.value[defaultLanguage.language] ||
												formatKeyValue(
													item?.value?.key,
													item?.value?.value,
													'min',
													'max'
												)}
										</span>
									</label>
								);
							})}
						</fieldset>
					);
				}
			)}
			<div className='py-1'>
				<NormalInput
					data={{
						state: additional?.result,
						name: 'result',
						fieldsetClass: 'flex flex-col grow bg-white px-[2px]',
						inputClass: 'h-21px',
					}}
					extractData={handleAdditionalInput}
				/>
			</div>
			<div className='py-1'>
				<NormalInput
					data={{
						state: additional?.marginError,
						name: 'marginError',
						fieldsetClass: 'flex flex-col grow bg-white px-[2px]',
						inputClass: 'h-21px',
					}}
					extractData={handleAdditionalInput}
				/>
			</div>
			<div className='py-1'>
				<ContextButton label='Add' type='edit' onClick={handleAdd} />
			</div>
		</form>
	);
};

export default Form;
