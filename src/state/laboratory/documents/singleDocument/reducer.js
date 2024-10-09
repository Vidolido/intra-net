import {
  ADD_TEMPLATE_LANGUAGE,
  CHECK_ROW,
  REMOVE_TEMPLATE_LANGUAGE,
  SECOND_LANGUAGE,
  TEMPLATE_COLUMNS_HIDE,
  TEMPLATE_COLUMNS_SHOW,
  TYPE_OF_VIEW,
  UNCHECK_ROW,
} from './actionTypes';

export const singleDocumentReducer = (draft, action) => {
  switch (action.type) {
    case TEMPLATE_COLUMNS_SHOW: {
      draft.template.hideColumns.push(action.payload);
      break;
    }
    case TEMPLATE_COLUMNS_HIDE: {
      let columns = draft.template.hideColumns.filter(
        (column) => column !== action.payload
      );
      draft.template.hideColumns = columns;
      break;
    }
    case ADD_TEMPLATE_LANGUAGE: {
      return '';
    }
    case REMOVE_TEMPLATE_LANGUAGE: {
      return '';
    }
    case SECOND_LANGUAGE: {
      return '';
    }
    case TYPE_OF_VIEW: {
      return '';
    }
    case CHECK_ROW: {
      draft.checkedRows.push(action.payload);

      break;
    }
    case UNCHECK_ROW: {
      let rows = draft.checkedRows.filter((row) => row !== action.payload);
      draft.checkedRows = rows;
      break;
    }
    default:
      return draft;
  }
};
