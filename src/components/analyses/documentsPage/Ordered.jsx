'use client';
import { useState } from 'react';

// components
import ArrowSvg from '@/../public/arrow.svg';
import PublishedDocuments from './PublishedDocuments';
// import PublishedTemplate from './PublishedTemplate';
// import PublishedSetting from './PublishedSetting';

const Ordered = ({ document, templateSettings }) => {
  const [visible, setVisible] = useState(true);
  // console.log(document, 'the doc');
  return (
    <div className='border relative min-w-72'>
      <h4
        className='border-b relative z-10 cursor-pointer'
        onClick={() => setVisible(!visible)}>
        {document.name['en']}
      </h4>
      <ArrowSvg
        className={`w-[22px] h-[22px] absolute right-1 top-[3px] fill-red-500 hover:fill-red-300 ${
          visible ? '' : 'rotate-180'
        } z-0`}
      />
      {!visible ? (
        ''
      ) : (
        <ul className='p-2'>
          <li className='grid grid-cols-3 w-full'>
            <p>Type</p>
            <p>Country</p>
            <p>{` `}</p>
          </li>
          {document?.items?.map((analysis) => {
            return (
              <li key={analysis._id} className='grid grid-cols-3 w-full mb-1'>
                <PublishedDocuments
                  analysis={analysis}
                  templateSettings={templateSettings}
                />
                {/* <PublishedTemplate
                  template={template}
                  products={products}
                  templateSettings={templateSettings}
                /> */}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Ordered;
