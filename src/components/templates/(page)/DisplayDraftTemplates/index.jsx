'use client';
import { useState } from 'react';

// components
import ArrowSvg from '@/../public/arrow.svg';
import Template from './Template';
import ShowHideButton from '@/components/reusable/ShowHideButton';

const DisplayDraftTemplates = ({ drafts }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className='flex flex-col gap-1 relative w-[30%]'>
      <ShowHideButton
        heading='Draft Templates'
        visible={visible}
        onClick={() => setVisible(!visible)}
      />
      {!visible ? (
        ''
      ) : (
        <ul>
          {drafts?.map((template) => {
            return (
              <li
                key={template._id}
                className=' border border-t-1 border-b-transparent last-of-type:border-b-slate-200 hover:border-b-red-300 '>
                <Template key={template._id} draft={template} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DisplayDraftTemplates;
