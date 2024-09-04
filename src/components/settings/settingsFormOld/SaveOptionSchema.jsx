'use client';

// state/actions
import { ADD, ADD_TO_COLLECTION } from '@/state/actionTypes';
import {
	useSettingsContext,
	useSettingsDispatchContext,
} from '@/state/settingsContext';
import { createOptionsSchema } from '@/utils/createOptionSchema';

// components
import ContextButton from '../../buttons/ContextButton';

const SaveOptionSchema = ({ setting }) => {
	const state = useSettingsContext();
	const dispatch = useSettingsDispatchContext();

	const handleOnClick = (e) => {
		let sector = e.target.form.elements.namedItem('sector');
		let settingName = e.target.form.elements.namedItem('settingName');
		let mainParam = e.target.form.elements
			.namedItem('option-schema-main')
			.querySelectorAll('input');

		let options = e.target.form.elements
			.namedItem('option-schema-options')
			.querySelectorAll('input');

		let createSchema = createOptionsSchema(mainParam, options);

		if (
			state.optionSchema &&
			state.optionSchema.collections &&
			state.optionSchema.collections.length !== createSchema.collections.length
		) {
			// Да проверам дали ги префрлува старите записи од state.optionSchema.collections
			let collections = state.optionSchema.collections;

			let newCollections = createSchema.collections.splice(
				collections.length,
				createSchema.collections.length
			);

			// console.log(collections, 'THE COLLECTIONS');

			collections.push(...newCollections);

			dispatch({
				type: ADD_TO_COLLECTION,
				payload: {
					state: 'optionsSchema',
					type: 'add',

					value: {
						parameter: { ...state.optionSchema.parameter },
						collections: [...collections],
					},
				},
			});
		} else {
			dispatch({
				type: ADD,
				payload: {
					state: 'optionsSchema',
					type: 'add',
					value: {
						...createSchema,
					},
				},
			});
		}
		dispatch({
			type: ADD,
			payload: {
				type: 'add',
				state: 'showOptionsSchema',
				value: false,
			},
		});
		// dispatch({
		//   type: ADD_TO_COLLECTION,
		//   payload: {
		//     state: 'optionSchema',
		//     value: payload,
		//   },
		// });
		// setState((prev) => ({
		//   ...prev,
		//   ...payload,
		// }));
		e.target.form.requestSubmit();
	};
	return (
		<ContextButton label='Use Schema' type='edit' onClick={handleOnClick} />
	);
};

export default SaveOptionSchema;
