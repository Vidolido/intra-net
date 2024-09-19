import { Fragment } from 'react';

// state/actions
import { getDisplayHeadings } from '@/utils/getDisplayHeadings';
import { groupParameters } from '@/utils/templates/groupParameters';

// components
import TemplateRow from './TemplateRow';
import { generateUUID } from '@/utils/generateUUID';

const ViewTemplate = ({ template, templateId, settings, defaultLanguage }) => {
  let headings =
    (settings && getDisplayHeadings(settings[0], 'plural')) || null;

  let mutTemplate = groupParameters(template) || [];

  return (
    <div className='border'>
      <div className='grid grid-cols-[25px_25%_1fr_1fr_1fr_1fr_25px] place-content-center border border-slate-500'>
        <div className='border-r border-slate-500 py-6'></div>
        {headings && headings.main && (
          <h6 className='border-r border-slate-500 flex justify-center items-center'>
            <span>{headings?.main[defaultLanguage.language]}</span>
          </h6>
        )}
        {headings &&
          headings?.collections &&
          headings?.collections?.map((collection, index) => (
            <h6
              key={index}
              className='text-left border-double border-r border-slate-500 flex justify-center items-center'>
              <span>{collection[defaultLanguage.language]}</span>
            </h6>
          ))}
        <h6 className='text-left border-r border-slate-500 flex justify-center items-center'>
          Result
        </h6>
        <p></p>
      </div>
      {mutTemplate.map((item) => {
        if (item.isGroup == undefined && item.parameter) {
          return (
            <TemplateRow key={item._id} item={item} templateId={templateId} />
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
