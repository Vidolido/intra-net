// state/context
import { getDraftSettings, getPublishedSettings } from '../apiCalls';

// components
import CreateDraftButton from '@/components/settings/CreateDraftButton';
import DisplayDraftSettings from '@/components/settings/draftSettings/DisplayDraftSettings';
import PublishedSettings from '@/components/settings/publishedSettings/PublishedSettings';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
  const { draftSettings } = await getDraftSettings();
  const { published } = await getPublishedSettings();
  //   console.log(published, 'pub');
  return (
    <div className='w-full'>
      <CreateDraftButton />
      <div className='flex justify-between w-full'>
        <PublishedSettings published={published} />
        <DisplayDraftSettings drafts={draftSettings} />
      </div>
    </div>
  );
};

export default page;
