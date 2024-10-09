'use client';
import { Fragment } from 'react';

// state/actions
import {
  useSingleDocumentContext,
  useSingleDocumentDispatchContext,
} from '@/state/laboratory/documents/singleDocument/singleDocumentContext';
import { generateUUID } from '@/utils/generateUUID';
// import { getDisplayHeadings } from '@/utils/getDisplayHeadings';
import { groupParameters } from '@/utils/templates/groupParameters';

// components
import TemplateRow from './TemplateRow';

const getDisplayHeadings = (setting) => ({
  main: setting?.parameter?.name.plural,
  collections: setting?.collections?.map((setting) => ({
    _id: setting._id,
    name: setting.name,
  })),
});

const ViewTemplate = ({
  template,
  templateId,
  laboratorySettings,
  defaultLanguage,
  collectionCount,
}) => {
  const { template: stateTemplate } = useSingleDocumentContext();
  const dispatch = useSingleDocumentDispatchContext();

  //   let showHide = template.hideColumns;

  let headings =
    (laboratorySettings &&
      getDisplayHeadings(laboratorySettings[0], 'plural')) ||
    null;

  let mutTemplate = groupParameters(template) || [];

  //   const collectionCount = headings?.collections?.length || 0;
  const gridCols = `grid-cols-[25px_25%_${'1fr_'.repeat(collectionCount)}25px]`;
  //   grid-cols-[25px_25%_1fr_1fr_1fr_1fr_25px]
  return (
    <div className='border'>
      <div
        className={`grid ${gridCols} place-content-center border border-slate-500`}>
        <div className='border-r border-slate-500 py-6'></div>
        {headings && headings.main && (
          <h6 className='border-r border-slate-500 flex justify-center items-center'>
            <span>{headings?.main[defaultLanguage.language]}</span>
          </h6>
        )}
        {headings &&
          headings?.collections &&
          headings?.collections?.map((collection, index) => {
            console.log(collection, 'heading collection');
            // if (stateTemplate.hideColumns.includes(collection._id.toString()))
            //   return;

            return (
              <h6
                key={index}
                className='text-left border-double border-r border-slate-500 flex justify-center items-center'>
                <span>{collection.name[defaultLanguage.language]}</span>
              </h6>
            );
          })}
        <h6 className='text-left border-r border-slate-500 flex justify-center items-center'>
          Result
        </h6>
        <p></p>
      </div>
      {mutTemplate.map((item, i) => {
        if (item.isGroup == undefined && item.parameter) {
          return (
            <TemplateRow
              key={item._id || i}
              item={item}
              templateId={templateId}
            />
          );
        }
        if (item.isGroup) {
          return item.items.map((collectionItem, i) => {
            return (
              <Fragment key={generateUUID()}>
                {i === 0 ? (
                  <div className='w-full border border-t-0 border-slate-500 pl-2 pb-[1px]'>
                    {item.name['en']}
                  </div>
                ) : null}
                <TemplateRow
                  key={i}
                  item={collectionItem}
                  templateId={templateId}
                />
              </Fragment>
            );
          });
        }
      })}
    </div>
  );
};

export default ViewTemplate;
