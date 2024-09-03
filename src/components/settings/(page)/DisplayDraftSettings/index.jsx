// components
import Setting from './Setting';

const DisplayDraftSettings = ({ drafts }) => {
  return (
    <div className='flex flex-col gap-1'>
      <h2>Draft Settings</h2>
      {!drafts.length
        ? 'There are no draft versions.'
        : drafts?.map((draft) => <Setting key={draft._id} draft={draft} />)}
    </div>
  );
};

export default DisplayDraftSettings;
