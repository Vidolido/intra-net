'use client';

// state/actions
import { createOptionsSchema } from '@/utils/createOptionSchema';
import { useSettingsContext } from '@/state/settingsContext';

// components
import ContextButton from '../buttons/ContextButton';

const SaveOptionSchema = () => {
	const { state, setState } = useSettingsContext();
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
		let payload = { sector: sector.value, settingName: settingName.value };

		if (
			state.optionSchema &&
			state.optionSchema.collections.length !== createSchema.collections.length
		) {
			let collections = state.optionSchema.collections;

			let lastInsertedCollection =
				createSchema.collections[createSchema.collections.length - 1];

			collections.push(lastInsertedCollection);

			payload = {
				...payload,
				optionSchema: {
					parameter: { ...state.optionSchema.parameter },
					collections: [...collections],
				},
			};
		} else {
			payload = {
				...payload,
				optionSchema: {
					...createSchema,
				},
			};
		}

		setState((prev) => ({
			...prev,
			...payload,
		}));
	};
	return <ContextButton label='Use Schema' onClick={handleOnClick} />;
};

export default SaveOptionSchema;
