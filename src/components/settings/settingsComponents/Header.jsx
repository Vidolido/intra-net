'use client';
import { useState } from 'react';

// state/action
import { saveDocumentSettings } from '@/serverActions/settings/saveDocumetSettings';

// components
import InputType from '@/components/inputs/InputType';
import SelectInput from '@/components/inputs/SelectInput';
import ContextButton from '@/components/buttons/ContextButton';
import ArrowSvg from '@/../public/arrow.svg';

const sectors = [
  { name: 'Laboratory' },
  { name: 'Oil Movement' },
  { name: 'Administration' },
  { name: 'I.T.' },
];

const status = [{ status: 'draft' }, { status: 'published' }];

const Header = ({ setting }) => {
  const [visible, setVisible] = useState(false);

  let docId = setting._id;
  let submit = saveDocumentSettings.bind(null, docId);

  return (
    <form action={submit} className='p-1 border border-slate-200 rounded'>
      <button
        type='button'
        onClick={() => setVisible(!visible)}
        className='relative w-full'>
        <h4 className='text-left'>Document Settings</h4>
        <ArrowSvg
          className={`w-[22px] h-[22px] absolute right-1 top-[3px] fill-red-500 hover:fill-red-300 ${
            visible ? '' : 'rotate-180'
          }`}
        />
      </button>
      <fieldset
        className={`flex gap-[1px] bg-slate-100 border-[1px] border-slate-100 p-[1px] rounded mb-1 ${
          !visible ? 'hidden' : 'visible'
        }`}>
        <label className='flex flex-col items-start bg-white p-1'>
          <span>Sector</span>
          <SelectInput
            name='sector'
            options={sectors}
            label='name'
            value='name'
            defaultValue={setting.sector}
          />
        </label>
        <label className='flex flex-col bg-white w-full p-1'>
          <span>Setting Name</span>
          <InputType
            type='text'
            name='settingName'
            defaultValue={setting.settingName}
          />
        </label>
        <label className='flex flex-col items-start bg-white p-1'>
          <span>Status</span>
          <SelectInput
            name='documentStatus'
            options={status}
            label='status'
            value='status'
            defaultValue={setting.documentStatus}
          />
        </label>
      </fieldset>
      <ContextButton
        label='Save Document Settings'
        type='edit'
        onClick={(e) => e.target.form.requestSubmit()}
        classes='w-full'
      />
    </form>
  );
};

export default Header;
