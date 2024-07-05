'use client';
import { useCallback } from 'react';

// state/actions
import { useErrorContext } from '@/state/ErrorContext';
import { addCollections } from '@/serverActions/settings/addCollections';

// components
import LanguageInputContainer from '@/components/inputs/LanguageInputContainer';
import ContextButton from '@/components/buttons/ContextButton';
import SettingError from '@/components/errorComponents/SettingsError';
import { nameArray } from '@/utils/nameArray';

const AddCollections = ({ languages, defaultLanguage, setting }) => {
	const { error: contextError, setError } = useErrorContext();

	const errorName = 'addCollections';

	const handleClick = useCallback(
		async (e) => {
			let collectionInput = e.target.form.elements
				.namedItem('collection-input')
				.querySelectorAll('input');

			// console.log(collectionInput, 'collections');

			const mutCollectionInput = Array.from(collectionInput).reduce(
				(acc, currentValue) => {
					let lang = currentValue.name.split('-');
					lang = lang[lang.length - 1];
					acc = {
						...acc,
						name: {
							...acc.name,
							[lang]: currentValue.value,
						},
					};
					return acc;
					// return {
					// 	...acc,
					// 	[currentValue.name]: currentValue.value,
					// };
				},
				{ name: {} }
			);

			// console.log(mutCollectionInput, 'the  name input');

			// let mutCollectionInput = Array.from(collectionInput).reduce(
			// 	(acc, currentValue) => {
			// 		let lang = currentValue.name.split('-');
			// 		lang = lang[lang.length - 1];
			// 		acc = {
			// 			...acc,
			// 			[lang]: currentValue.value,
			// 		};
			// 		return acc;
			// 	},
			// 	{}
			// );

			// console.log(mutCollectionInput, 'mutCollectionInput');

			// let names = nameArray(mutCollectionInput);
			// console.log(names, 'the  name input');
			const length = !setting.collections ? 0 : setting.collections.length; // take the length before population

			const collectionElements = Array.from(e.target.form.elements).filter(
				(element) => element.name.includes('collection')
			);

			const collectionNames = collectionElements?.map((element) => {
				let nameArray = element.name.split('-').splice(1);
				return {
					[length + '-' + nameArray.join('-')]: element.value,
				};
			});

			// let { error } = await addCollections(collectionNames, setting);
			let { error } = await addCollections(mutCollectionInput, setting);
			// let { error } = await addCollections(nameObject, setting);
			setError((prevState) => {
				if (error) {
					return {
						...prevState,
						error,
					};
				} else return {};
			});

			if (!error[errorName])
				collectionElements.forEach((item) => (item.value = ''));
		},
		[setting, setError]
	);
	return (
		<div className='flex items-end gap-2'>
			<LanguageInputContainer
				fieldSetName='collection-input'
				label='Collection'
				languages={languages}
				name='collection'
				defaultLanguage={defaultLanguage}
			/>
			<ContextButton label='Add' type='edit' onClick={handleClick} />
			<SettingError errorFrom={errorName} />
		</div>
	);
};

export default AddCollections;
