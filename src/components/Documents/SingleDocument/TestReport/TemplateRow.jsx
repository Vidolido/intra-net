'use client';
import {
  CHECK_ROW,
  UNCHECK_ROW,
} from '@/state/laboratory/documents/singleDocument/actionTypes';
// state/actions
import {
  useSingleDocumentContext,
  useSingleDocumentDispatchContext,
} from '@/state/laboratory/documents/singleDocument/singleDocumentContext';
import { formatKeyValue } from '@/utils/settings/formatKeyValue';

const TemplateRow = ({ item, templateId }) => {
  const { template, checkedRows } = useSingleDocumentContext();
  const dispatch = useSingleDocumentDispatchContext();

  const onChecked = (e) => {
    const { checked, value } = e.target;
    // console.log(checked, value, 'checked and value');
    checked
      ? dispatch({ type: CHECK_ROW, payload: value })
      : dispatch({ type: UNCHECK_ROW, payload: value });
  };
  // console.log(item, 'item');
  // console.log(
  //   checkedRows.includes(item._id.toString()) ? 'checked' : 'not',
  //   'item CONDITION'
  // );
  // console.log(checkedRows, 'checkedRows');
  // console.log(item, 'the item');
  return (
    <div className='grid grid-cols-[25px_25%_1fr_1fr_1fr_1fr_25px] border border-t-0 border-slate-500'>
      <div className='border-r border-slate-500 flex justify-center items-center'>
        {/* <DragSvg className='text-slate-400 hover:text-red-600 text-center w-[25px] h-[25px] cursor-pointer' /> */}
        <input
          type='checkbox'
          checked={checkedRows.includes(item._id.toString()) ? 'checked' : ''}
          value={item._id}
          onChange={onChecked}
        />
      </div>
      <p className='border-r border-slate-500 pl-2'>
        {item.parameter.propertyValue['en']}
      </p>
      {Object.entries(item.items).map((collection) => {
        // console.log(collection, 'THE COLLECTION');
        return (
          <div
            key={collection[0]}
            className='border-r border-slate-500 flex justify-center items-center'>
            {collection[1] &&
              collection[1].map((collectionItem) => {
                if (template.hideColumns.includes(collection[0])) return;

                return (
                  <p key={collectionItem._id}>
                    {(typeof collectionItem.value === 'string' &&
                      collectionItem.value) ||
                      collectionItem.value['en'] ||
                      formatKeyValue(
                        collectionItem?.value?.key,
                        collectionItem?.value?.value,
                        'min',
                        'max'
                      )}
                  </p>
                );
              })}
          </div>
        );
      })}
      <p className='border-r border-slate-500 flex justify-center items-center'>
        <span>{item.result}</span>
      </p>

      <div>{/* <RowOptions templateId={templateId} rowId={item._id} /> */}</div>
    </div>
  );
};

export default TemplateRow;
