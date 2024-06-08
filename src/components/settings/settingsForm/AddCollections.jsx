'use client';
import { useCallback } from 'react';

// state/actions
import { useErrorContext } from '@/state/errorContext';
import { addCollections } from '@/serverActions/settings/addCollections';
// import {
// 	useSettingsContext,
// 	useSettingsDispatchContext,
// } from '@/state/settingsContext';
// import { ADD } from '@/state/actionTypes';

// components
import LanguageInputContainer from '@/components/inputs/LanguageInputContainer';
import ContextButton from '@/components/buttons/ContextButton';
import SettingError from '@/components/errorComponents/SettingsError';

const AddCollections = ({ languages, defaultLanguage, setting }) => {
	const { error: contextError, setError } = useErrorContext();

	const errorName = 'addCollections';

	const handleClick = useCallback(
		async (e) => {
			const length = !setting.collections ? 0 : setting.collections.length; // take the length before population

			const collectionElements = Array.from(e.target.form.elements).filter(
				(element) => element.name.includes('collection')
			);
			const collectionNames = collectionElements?.map((element) => {
				let nameArray = element.name.split('-').splice(1);
				console.log(nameArray);
				return {
					[length + '-' + nameArray.join('-')]: element.value,
				};
			});

			console.log(collectionNames, 'the  collectionNames');
			let { error } = await addCollections(collectionNames, setting);
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
			// dispatch({
			// 	type: ADD,
			// 	payload: { state: 'collections', value: collectionNames, type: 'push' },
			// });
		},
		[setting, setError]
	);

	return (
		<div className='flex items-end gap-2'>
			<LanguageInputContainer
				label='Collection'
				languages={languages}
				name='collection'
				defaultLanguage={defaultLanguage}
			/>
			<ContextButton label='Add' onClick={handleClick} />
			<SettingError errorFrom={errorName} />
		</div>
	);
};

export default AddCollections;
