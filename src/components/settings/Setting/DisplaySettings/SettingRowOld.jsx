'use client';
// components
import DragSvg from '@/../public/drag.svg';
import { useState } from 'react';

const SettingRow = ({
  defaultLanguage,
  languages,
  settingId,
  setting,
  classes,
  gridTemplateColumns,
}) => {
  const [visible, setVisible] = useState(false);

  const property = setting?.parameter?.inputValue;
  const collections = setting?.collections;

  const handleClick = (e) => {
    setVisible(!visible);
  };
  return (
    <div className={classes} style={{ gridTemplateColumns }}>
      <div className='border-r'>
        <DragSvg className='text-slate-400 hover:text-red-600 text-center w-[25px] h-[25px] cursor-pointer' />
      </div>

      {/* edit component */}
      {visible && <div>OVA SE OPCIITE</div>}

      {/* view db data component */}
      {!visible && (
        <div className='border-r px-3'>
          <p>{property[defaultLanguage]}</p>
        </div>
      )}

      {!visible &&
        collections.map((collection) => (
          <div key={collection._id} className='border-r px-3'>
            {collection?.items.map((item, i) => {
              return (
                <p key={item._id}>
                  {' '}
                  {(typeof item.value === 'string' && item.value) ||
                    item.value[defaultLanguage] ||
                    `${item?.value?.key} - ${item?.value?.value}`}
                </p>
              );
            })}
          </div>
        ))}

      {/* button component */}
      <div className='border-r px-3'>
        <button onClick={handleClick}>ClickME</button>
      </div>
    </div>
  );
};

export default SettingRow;
