import { isObjectEmpty } from '@/utils/functions';
import {
  ADD,
  ADD_TO_COLLECTION,
  REMOVE,
  REMOVE_FROM_COLLECTION,
  UPDATE,
} from './actionTypes';

export const addSettingReducer = (draft, action) => {
  let type = action.payload.type;
  let property = action.payload.state;
  let value = action.payload.value;
  switch (action.type) {
    case ADD: {
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

      break;
    }
    case REMOVE: {
      console.log(action, 'action in REMOVE');
      // draft[property].collections.splice(action.payload.value.index, 0);

      break;
    }
    case REMOVE_FROM_COLLECTION: {
      console.log(action, 'action in REMOVE_FROM_COLLECTION');
      draft[property].splice(action.payload.value.index, 1);
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
