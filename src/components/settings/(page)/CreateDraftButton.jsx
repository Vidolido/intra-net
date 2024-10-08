'use client';
import { useRouter } from 'next/navigation';

// state/actions
import { makeDraftSetting } from '@/serverActions/settings/makeDraftSetting';

const CreateDraftButton = () => {
  const router = useRouter();

  const handdleClick = async (e) => {
    await makeDraftSetting();
    router.push('/dashboard/settings/create');
  };

  return (
    <button
      type='button'
      onClick={handdleClick}
      className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-semibold pt-[1px] pb-[3px] px-5 rounded'>
      Add New Setting
    </button>
  );
};

export default CreateDraftButton;
