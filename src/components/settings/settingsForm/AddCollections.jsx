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
	const { error, setError } = useErrorContext();

	const handleClick = useCallback(
		async (e) => {
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
			let { error } = await addCollections(collectionNames, setting);

			setError((prevState) => {
				if (error) {
					return {
						...prevState,
						error,
					};
				} else return {};
			});

			// dispatch({
			// 	type: ADD,
			// 	payload: { state: 'collections', value: collectionNames, type: 'push' },
			// });
		},
		[setting, setError]
	);
	// const handleClick = useCallback(
	// 	async (e) => {
	// 		const length = state.collections.length; // take the length before population
	// 		// const length = !setting.collections ? 0 : setting.collections.length;

	// 		// console.log(setting, 'THE SETTING AFTER CLICK');

	// 		const collectionElements = Array.from(e.target.form.elements).filter(
	// 			(element) => element.name.includes('collection')
	// 		);

	// 		const collectionNames = collectionElements?.map((element) => {
	// 			let nameArray = element.name.split('-').splice(1);
	// 			return {
	// 				[length + '-' + nameArray.join('-')]: element.value,
	// 			};
	// 		});
	// 		// console.log(collectionNames, 'THE NAMES');
	// 		// let test = JSON.parse(await addCollections(collectionNames, setting));
	// 		// await addCollections(collectionNames, setting);

	// 		dispatch({
	// 			type: ADD,
	// 			payload: { state: 'collections', value: collectionNames, type: 'push' },
	// 		});
	// 	},
	// 	[dispatch, state.collections]
	// );
	// console.log(state, 'THE STATEeee');
	// console.log(error, 'the error');
	return (
		<div className='flex items-end gap-2'>
			<LanguageInputContainer
				label='Collection'
				languages={languages}
				name='collection'
				defaultLanguage={defaultLanguage}
			/>
			<ContextButton label='Add' onClick={handleClick} />
			<SettingError errorFrom='addCollections' />
		</div>
	);
};

export default AddCollections;
