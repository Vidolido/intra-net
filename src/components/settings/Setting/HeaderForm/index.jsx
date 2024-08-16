'use client';
import { useState } from 'react';
import { useFormState } from 'react-dom';

// state/actions
import { generateUUID } from '@/utils/generateUUID';
import { saveSettingHeader } from '@/serverActions/settings/saveSettingHeader';

// components
import ArrowSvg from '@/../public/arrow.svg';
import SelectInput from '@/components/inputs/SelectInput';
import InputType from '@/components/inputs/InputType';
import ContextButton from '@/components/buttons/ContextButton';

const sectors = [
  {
    _id: generateUUID(),
    name: { en: 'Administration', mk: 'Администрација', gr: '' },
  },
  {
    _id: generateUUID(),
    name: { en: 'Oil Movement', mk: 'Д.Н.Д.', gr: '' },
  },
  {
    _id: generateUUID(),
    name: { en: 'Laboratory', mk: 'Лабораторија', gr: '' },
  },
  {
    _id: generateUUID(),
    name: { en: 'I.T.', mk: 'И.Т.', gr: '' },
  },
];

const status = [{ status: 'draft' }, { status: 'published' }];

const HeaderForm = ({ setting, languages }) => {
  // const [state, formAction] = useFormState(saveSettingHeader, null);
  const [state, formAction] = useFormState(saveSettingHeader, {
    message: '',
    error: '',
  });
  // let hasName =
  //   setting.settingName != null && setting.settingName ? false : true;
  let hasName = !setting.settingName;
  const [visible, setVisible] = useState(hasName);

  // console.log(state, ' THE STATE FRONTEND');
  return (
    <form action={formAction} className='p-1 border border-slate-200 rounded'>
      <input
        type='text'
        className='hidden'
        defaultValue={setting._id}
        name='document_id'
      />
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
            value='name'
            defaultLanguage={languages[0].language}
            defaultValue={setting.sector}
          />
        </label>
        <label className='flex flex-col bg-white w-full p-1'>
          <span>Setting Name</span>
          <InputType
            type='text'
            name='settingName'
            defaultValue={setting.settingName}
            required={true}
          />
        </label>

        {setting.settingName != null && (
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
        )}
      </fieldset>
      <p>{state?.error}</p>
      {visible && (
        <ContextButton
          label='Save Document Settings'
          type='edit'
          onClick={(e) => e.target.form.requestSubmit()}
          classes='w-full'
        />
      )}
    </form>
  );
};

export default HeaderForm;
