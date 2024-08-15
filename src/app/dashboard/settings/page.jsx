// state/context
import { getSettings } from '../apiCalls';

// components
import CreateDraftButton from '@/components/settings/CreateDraftButton';
import DisplayDraftSettings from '@/components/settings/draftSettings/DisplayDraftSettings';
import PublishedSettings from '@/components/settings/publishedSettings/PublishedSettings';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
  const { settings: drafts } = await getSettings({
    isDeleted: false,
  });
  const { settings: published } = await getSettings({
    documentStatus: 'published',
    isDeleted: false,
  });

  return (
    <div className='w-full'>
      <CreateDraftButton />
      <div className='flex justify-between w-full'>
        <PublishedSettings published={published} />
        <DisplayDraftSettings drafts={drafts} />
      </div>
    </div>
  );
};

export default page;
