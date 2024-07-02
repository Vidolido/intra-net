'use client';
import Link from 'next/link';

// state/actions
// import { deleteDraftSetting } from '@/serverActions/settings/deleteDraftSetting';

// components
import ContextButton from '@/components/buttons/ContextButton';
// import ContextButton from '@/components/buttons/ContextButton';

const PublishedSetting = ({ setting }) => {
  const handleDelete = async (_id) => {
    // await deleteDraftSetting(_id);
  };
  return (
    <Link
      key={setting?._id}
      href={`/dashboard/settings/edit/${setting._id}`}
      className='flex gap-2 justify-between items-center border-2 border-slate-200 hover:border-red-200 p-1'>
      <h5>{setting?.settingName}</h5>
      <ContextButton
        label='Delete'
        type='edit'
        onClick={() => handleDelete(setting._id)}
        classes='self-end'
      />
    </Link>
  );
};

export default PublishedSetting;
{
  /* <div className='flex gap-2 justify-between items-center border-2 border-slate-200 hover:border-red-200 p-1'>
</div> */
}
