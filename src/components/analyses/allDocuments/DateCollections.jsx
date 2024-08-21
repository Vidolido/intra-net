'use client';
import { useState } from 'react';

// state/actions
import { formatDate } from '@/utils/formatDate';

// components
import ArrowSvg from '@/../public/arrow.svg';
import Labels from './Labels';
import SingleDateCollection from './SingleDateCollection';

const DateCollections = ({ collection, templateSettings }) => {
  const [visible, setVisible] = useState(true);

  const { date } = formatDate(collection.date);

  const handleHide = () => {
    setVisible(!visible);
  };
  // const documentClasses = showOptions ? 'grid-cols-5' : 'grid-cols-4';
  return (
    <div>
      <button type='button' onClick={handleHide} className='relative w-full'>
        <h4 className='text-left hover:text-red-500'>{date}</h4>
        <ArrowSvg
          className={`w-[22px] h-[22px] absolute right-1 top-[3px] fill-red-500 hover:fill-red-300 ${
            visible ? '' : 'rotate-180'
          }`}
        />
      </button>
      <div className={` ${!visible ? 'hidden' : 'visible'}`}>
        <Labels classes={'grid-cols-4'} dateTime={false} />
        <SingleDateCollection
          collection={collection}
          templateSettings={templateSettings}
          // showOptions={showOptions}
          // documentClasses={documentClasses}
        />
      </div>
    </div>
  );
};

export default DateCollections;
