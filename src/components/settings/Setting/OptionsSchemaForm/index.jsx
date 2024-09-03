'use client';
import { useState } from 'react';
import { useFormState } from 'react-dom';

// state/actions
import { saveOptionSchema } from '@/serverActions/settings/saveOptionSchema';

// components
import ArrowSvg from '@/../public/arrow.svg';
import MainInput from './MainInput';
import AddCollections from './AddCollections';
import Collections from './Collections';
import ContextButton from '@/components/buttons/ContextButton';

const OptionsSchema = ({ setting, languages }) => {
  const [state, formAction] = useFormState(saveOptionSchema, {
    error: {},
    message: {},
  });

  const [visible, setVisible] = useState(setting?.optionsSchema ? false : true);
  const [collections, setCollections] = useState(
    setting?.optionsSchema?.collections || []
  );
  return (
    <form
      action={formAction}
      className='flex flex-col gap-1 bg-slate-100 border-[1px] border-slate-100 p-1 rounded'>
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
        <h4 className='text-left'>Option schema</h4>
        <ArrowSvg
          className={`w-[22px] h-[22px] absolute right-1 top-[3px] fill-red-500 hover:fill-red-300 ${
            visible ? '' : 'rotate-180'
          }`}
        />
      </button>
      {visible && (
        <>
          <MainInput
            setting={setting}
            languages={languages}
            error={state.error}
          />
          {/* <p>{state?.error?.singular || state?.error?.plural}</p> */}

          <AddCollections
            collectionsLength={collections.length}
            languages={languages}
            setCollections={setCollections}
          />
          {!!collections.length && (
            <Collections
              collections={collections}
              setCollections={setCollections}
              languages={languages}
            />
          )}
        </>
      )}
      <p>{state?.error.message}</p>
      {!!collections.length && visible && (
        <ContextButton
          label='Save Options Schema'
          type='edit'
          onClick={(e) => e.target.form.requestSubmit()}
        />
      )}
    </form>
  );
};

export default OptionsSchema;
