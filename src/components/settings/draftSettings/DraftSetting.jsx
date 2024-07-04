'use client';
import Link from 'next/link';

// state/actions
import { deleteDraftSetting } from '@/serverActions/settings/deleteDraftSetting';

// components
import ContextButton from '@/components/buttons/ContextButton';
import { deleteSettingDocument } from '@/serverActions/settings/deleteSettingDocument';

const DraftSetting = ({ draft }) => {
  const handleDelete = async (_id) => {
    await deleteDraftSetting(_id);
    await deleteSettingDocument(_id, 'draft');
  };
  return (
    <div className='flex gap-2 justify-between border-2 border-slate-200 hover:border-red-200 p-2'>
      <Link key={draft?._id} href={`/dashboard/settings/draft/${draft._id}`}>
        <h5>{draft?._id}</h5>
        <p>{draft?.settingName}</p>
      </Link>
      <ContextButton
        label='Delete'
        type='edit'
        onClick={() => handleDelete(draft._id)}
        classes='self-end'
      />
    </div>
  );
};

export default DraftSetting;
