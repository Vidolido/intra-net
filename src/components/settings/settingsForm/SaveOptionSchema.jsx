'use client';

// state/actions
import { createOptionsSchema } from '@/utils/createOptionSchema';
import {
	useSettingsContext,
	useSettingsDispatchContext,
} from '@/state/settingsContext';

// components
import ContextButton from '../../buttons/ContextButton';
import { ADD, ADD_TO_COLLECTION } from '@/state/actionTypes';

const SaveOptionSchema = ({ setting }) => {
	// const { state, setState } = useSettingsContext();
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
		// let payload = { sector: sector.value, settingName: settingName.value };
		dispatch({
			type: ADD,
			payload: { state: 'sector', value: sector.value, type: 'add' },
		});
		dispatch({
			type: ADD,
			payload: { state: 'settingName', value: settingName.value, type: 'add' },
		});

		// console.log(hasProp, 'HAS PROP');\
		// console.log(options, 'options');

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
			// payload = {
			//   ...payload,
			//   optionSchema: {
			//     ...createSchema,
			//   },
			// };
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
	// console.log(setting, 'THE SETTING IN SAVE OPTION SHCEMA');
	// console.log(state, 'THE STATE IN SAVE OPTION SCHEMA');
	return <ContextButton label='Use Schema' onClick={handleOnClick} />;
};

export default SaveOptionSchema;
