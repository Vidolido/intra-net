import { useState } from 'react';

// components
import LanguageInput from '@/components/reusable/LanguageInput';
import NormalInput from '@/components/reusable/NormalInput';

let types = (languages, value, onChange) => ({
	simple: (
		<NormalInput
			data={{
				state: value,
				name: 'simple',
				inputClass: 'h-21 px-2',
			}}
			extractData={onChange}
		/>
	),
	translations: (
		<LanguageInput
			languages={languages}
			data={{
				defaultLanguage: languages[0].language,
				state: value,
				labelClass: 'block',
				inputName: 'translations',
			}}
			extractData={onChange}
		/>
	),
	'key/value': (
		<div className='flex gap-1'>
			<NormalInput
				data={{
					state: value?.key,
					name: 'key',
					inputClass: 'h-21px px-2',
				}}
				extractData={onChange}
			/>
			<NormalInput
				data={{
					state: value?.value,
					name: 'value',
					inputClass: 'h-21px px-2',
				}}
				extractData={onChange}
			/>
		</div>
	),
});

const EditCollectionItem = ({
	languages,
	state,
	setState,
	selectedCollection,
	item,
}) => {
	const handleChange = (data, dataObj) => {
		let collection = [...state?.collections[selectedCollection]];

		collection = collection.map((cItem) => {
			if (cItem.id === item.id && cItem._id === item._id) {
				let value;
				if (item.inputType === 'simple') {
					value = data;
				}
				if (item.inputType === 'translations') {
					value = data;
				}
				if (item.inputType === 'key/value') {
					value = { ...cItem?.value, [dataObj?.name]: data };
				}
				cItem.value = value;
			}
			return cItem;
		});
		setState((prev) => ({
			...prev,
			collections: {
				...prev.collections,
				[selectedCollection]: collection,
			},
		}));
	};
	// console.log(state, 'the state');
	return (
		<div> {types(languages, item.value, handleChange)[item.inputType]} </div>
	);
};

export default EditCollectionItem;
