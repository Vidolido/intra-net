import CreateDraftButton from './(page)/CreateDraftButton';
import PublishedSettings from './(page)/PublishedSettings';
import DisplayDraftSettings from './(page)/DisplayDraftSettings';

const Settings = ({ drafts, published }) => {
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

export default Settings;
