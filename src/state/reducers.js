import {
	ADD,
	ADD_TO_COLLECTION,
	EDIT_COLLECTION_ITEM,
	REMOVE,
	REMOVE_FROM_COLLECTION,
	UPDATE,
} from './actionTypes';

export const addSettingReducer = (draft, action) => {
	let type = action.payload.type;
	let property = action.payload.state;
	let value = action.payload.value;
	let more = action.payload.more || null;
	switch (action.type) {
		case ADD: {
			// console.log(action, 'THE ACTION IN REDUCER');
			if (type === 'add') {
				draft[property] = value;
			}
			if (type === 'push') {
				draft[property].push(value);
			}
			break;
		}
		case ADD_TO_COLLECTION: {
			if (type === 'add') {
				draft[property] = value;
			}
			if (type === 'push') {
				draft[property].push(value);
			}
			if (more) {
				if (
					draft[property][more.property][more.selection][more.secondProp] !==
					undefined
				) {
					draft[property][more.property][more.selection][more.secondProp].push(
						value
					);
					return;
				}
				draft[property][more.property][more.selection][more.secondProp] = [
					value,
				];
			}
			break;
		}
		case REMOVE: {
			console.log(action, 'action in REMOVE');
			// draft[property].collections.splice(action.payload.value.index, 0);

			break;
		}
		case REMOVE_FROM_COLLECTION: {
			if (more) {
				let collection =
					draft[property][more.property][draft.selectedCollection].items;
				let mutCollection = collection.filter((item) => item.id !== value);
				draft[property][more.property][draft.selectedCollection].items =
					mutCollection;
			}
			if (!more) {
				draft[property].splice(
					draft[property].findIndex(
						(item) =>
							JSON.stringify(item) === JSON.stringify(action.payload.value)
					),
					1
				);
			}

			break;
		}
		case EDIT_COLLECTION_ITEM: {
			// console.log(action, 'reduc');
			let id = action.payload.id;
			const index = draft.optionsSchema.collections[
				draft.selectedCollection
			].items.findIndex((item) => item.id === id);

			if (index !== -1)
				draft.optionsSchema.collections[draft.selectedCollection].items[
					index
				].value = action.payload.itemValue;

			// if (index !== -1) draft[index].done = true
			// let item = draft.optionsSchema.collections.findIndex((item) =>
			// 	item.items.every((i) => i.id === id)
			// );

			// let collection =
			// 	draft.optionsSchema.collections[draft.selectedCollection];
			// console.log(collection, 'the collection');
			// // draft.optionsSchema.collections[item] = action.payload.value;
			// // collection.items[id].value = action.payload.value;
			// let mutItem = collection.items.filter((item) => item.id === id);
			// mutItem[0].value = action.payload.value;
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
