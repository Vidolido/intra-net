// components
import DragSvg from '@/../public/drag.svg';
import RowOptions from './RowOptions';

const TemplateRow = ({ item, templateId, classes }) => {
  return (
    <div
      className={`grid grid-cols-[25px_25%_1fr_1fr_1fr_1fr_1fr_25px] border border-t-0 border-slate-300 ${classes}`}>
      <div className='border-r border-slate-300'>
        <DragSvg className='text-slate-400 hover:text-red-600 text-center w-[25px] h-[25px] cursor-pointer' />
      </div>
      <p className='border-r border-slate-300 pl-2'>
        {item.parameter.propertyValue['en']}
      </p>
      {Object.entries(item.items).map((collection) => {
        return (
          <div key={collection[0]}>
            {collection[1] &&
              collection[1].map((collectionItem, i) => {
                return (
                  <p
                    key={collectionItem.id}
                    className='border-r border-slate-300 pl-2'>
                    {' '}
                    {(typeof collectionItem.value === 'string' &&
                      collectionItem.value) ||
                      collectionItem.value['en'] ||
                      `${collectionItem?.value?.key} - ${collectionItem?.value?.value}`}
                  </p>
                );
              })}
          </div>
        );
      })}
      <p className='border-r border-slate-300 pl-2 bg-slate-100'>
        {item.result}
      </p>
      <p className='border-r border-slate-300 pl-2 bg-slate-100'>
        {item.marginError}
      </p>
      <div>
        <RowOptions templateId={templateId} rowId={item._id} />
      </div>
    </div>
  );
};

export default TemplateRow;
