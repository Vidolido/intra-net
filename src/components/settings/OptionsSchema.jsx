'use client';
import ArrowSvg from '@/../public/arrow.svg';

import { useState } from 'react';

const OptionsSchema = ({ children }) => {
  const [show, setShow] = useState(true);
  // const []

  const handleOnClick = (e) => {
    console.log(e);
    setShow(!show);
  };
  return (
    <div
      className={`flex flex-col gap-1 bg-slate-100 border-[1px] border-slate-100 p-[1px] rounded`}>
      <button
        type='button'
        onClick={handleOnClick}
        className='text-left relative'>
        <h4>Option schema</h4>
        <ArrowSvg
          className={`w-[22px] h-[22px] absolute right-1 top-[2px] fill-red-500 hover:fill-red-300 ${
            !show ? '' : 'rotate-180'
          }`}
        />
      </button>

      {!show ? '' : children}
    </div>
  );
};

export default OptionsSchema;
