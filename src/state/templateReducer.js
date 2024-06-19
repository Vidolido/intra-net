import {
	ADD,
	ADD_TO_COLLECTION,
	EDIT_COLLECTION_ITEM,
	REMOVE,
	REMOVE_FROM_COLLECTION,
	UPDATE,
} from './actionTypes';

export const createAnalysisReducer = (draft, action) => {
	let type = action.payload.type;
	let property = action.payload.state;
	let value = action.payload.value;
	let more = action.payload.more || null;
	switch (action.type) {
		case ADD: {
			// console.log(action, 'THE ACTION IN REDUCER');
			// console.log(action, 'action in ADD');
			draft[property] = value;

			break;
		}
		case ADD_TO_COLLECTION: {
			console.log(action, 'action in ADD_TO_COLLECTION');
			draft[property] = {
				...draft[property],
				...value,
			};
			break;
		}
		case REMOVE: {
			console.log(action, 'action in REMOVE');

			break;
		}
		case REMOVE_FROM_COLLECTION: {
			console.log(action, 'action in REMOVE_FROM_COLLECTION');

			break;
		}
		case EDIT_COLLECTION_ITEM: {
			// console.log(action, 'action in EDIT COLLECTION');
			let index = draft.fields.findIndex((field) => field._id === value._id);
			draft.fields[index].checked =
				value.checked === 'false' ? 'checked' : 'false';
			break;
		}
		case UPDATE: {
			console.log(action, 'action in UPDATE');
			break;
		}
		case DELETE: {
			console.log(action, 'action in DELETE');
			break;
		}
		default: {
			console.log(action, 'action in default');
			console.log('default');
		}
	}
};
