// components
import DraftTemplate from './DraftTemplate';

const DisplayDraftTemplates = ({ drafts }) => {
  return (
    <div className='flex flex-col gap-1'>
      <h2>Draft Templates</h2>
      {!drafts
        ? 'There are no draft versions.'
        : drafts?.map((draft) => {
            return <DraftTemplate key={draft._id} draft={draft} />;
          })}
    </div>
  );
};

export default DisplayDraftTemplates;
