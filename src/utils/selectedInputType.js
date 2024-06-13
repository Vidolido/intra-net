import { generateUUID } from './generateUUID';

export const selectedInputType = (e, inputType) => {
	switch (inputType) {
		case 'simple': {
			let simpleInput = e.target.form.elements.namedItem('collection-input');
			return {
				id: generateUUID(),
				inputType,
				value: simpleInput.value,
			};
		}
		case 'translations': {
			let inputs = e.target.form?.elements
				.namedItem('collection-language-inputs')
				.querySelectorAll('input');

			let translationInputs = Array.from(inputs).reduce((acc, currentValue) => {
				let nameArray = currentValue.name.split('-');
				let lang = nameArray[nameArray.length - 1];
				acc = {
					...acc,
					[lang]: currentValue.value,
				};
				return acc;
			}, {});

			return {
				id: generateUUID(),
				inputType: 'translations',
				value: translationInputs,
			};
		}
		case 'key/value': {
			let keyValueInput = e.target.form.elements
				.namedItem('collection-input-fields')
				.querySelectorAll('input');

			let key = Array.from(keyValueInput).filter(
				(input) => input.name === 'key'
			)[0];
			let value = Array.from(keyValueInput).filter(
				(input) => input.name === 'value'
			)[0];

			return {
				id: generateUUID(),
				inputType: 'key/value',
				value: {
					key: key.value,
					value: value.value,
				},
			};
		}
		default: {
			return 'default';
		}
	}
};
